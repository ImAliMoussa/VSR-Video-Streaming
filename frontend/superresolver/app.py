from flask import Flask, request, jsonify, abort, render_template, send_from_directory
from flask_cors import CORS
import json
import logging
from logging import Formatter, FileHandler
import sr
import os
import glob
from rrn import RRN_SR

from vidgear.gears import CamGear, StreamGear, WriteGear, VideoGear
import os
from fsrcnn_resolver import Resolver
from multiprocessing import Process


import cv2

import time

app = Flask(__name__)

class RunningProcess:

    sr_process = None
    download_process = None


# app.config.from_object('config')

CORS(app, resources={r"*": {"origins": "*"}}, allow_headers="*")

# @app.after_request
#     def after_request(response):
#         # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#         # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#         response.headers.add(
#             "Acces-Control-Allow-Headers", "content-Type,Authorization"
#         )
#         response.headers.add(
#             "Access-Control-Allow-Methods", "GET, HEAD, OPTIONS"
#         )

#         response.headers.add("Access-Control-Allow-Credentials", "true")

#         return response



def stream_video(video_url, audio_url, output="dash/output.mpd"):
    print('Starting')
    perform_super_resolution = True
    print('*\n'*50, video_url)
    stream = CamGear(
        source=video_url,
        logging=False,
    ).start()

    # activate Single-Source Mode and various streams, along with custom audio
    stream_params = {
        # "-input_framerate": stream.framerate
        "-clear_prev_assets": True,
        "-livestream": False,
        "-audio": audio_url,
    }

    # try:
    #     os.remove(output) # delete previous
    # except:
    #     pass

    # # describe a suitable manifest-file location/name and assign params
    streamer = StreamGear(output=output, **stream_params)

    while True:
        frame = stream.read()
        if frame is None:
            break

        if perform_super_resolution:
            # super_res_frame = sr.super_resolve_fsrcnn(resized) ##onnx
            # h, w, _ = frame.shape
            # w_new = min(w, 120)
            # h = int(w_new/ w * h)
            # unchanged = not (w == w_new)
            # w = w_new

            # #print(w,h)
            # if unchanged:
            #     resized = cv2.resize(frame, (w, h), interpolation=cv2.INTER_AREA)
            # else:
            #     resized = frame
            # # print("max value : ", super_res_frame[0][0])
            # #super_res_frame = Resolver.perform_sr(resized)
            resized = cv2.resize(frame, (224, 100), interpolation=cv2.INTER_AREA)

            super_res_frame = sr.super_resolve_fsrcnn(resized) ##onnx
            streamer.stream(super_res_frame)

        else:
            streamer.stream(frame)

    print('==========break=========1')
    print('==========break=========2')
    print('==========break=========3')

    # safely close video stream
    stream.stop()
    # safely close streamer
    streamer.terminate()

def save_sr(video_url, audio_url, video_name='output.mp4'):
    
    # Open input video stream
    stream = CamGear(source=video_url).start()
    tr = None

    # set input audio stream path
    input_audio = audio_url
    #input_audio = 'https://filesamples.com/samples/audio/aac/sample3.aac'

    # define your parameters
    output_params = {
        "-input_framerate": stream.framerate
    }  # output framerate must match source framerate

    # Define writer with defined parameters and suitable output filename for e.g. `Output.mp4`
    writer = WriteGear(output_filename="no_audio_"+video_name, logging=True, **output_params)

    print('Writing')

    # loop over
    frame = None
    frame1 = None
    while True:

        # read frames from stream
        frame = frame1
        frame1 = stream.read()

        # check for frame if Nonetype

        if frame1 is None:
            break
        if frame is None:
            continue
        if tr is None:
            tr = RRN_SR(frame.shape[0],frame.shape[1])
        sr_frame = tr.sr_rrn(frame, frame1)
        # write frame to writer
        #writer.write(frame1)
        writer.write(sr_frame)

        # Show output window
        #cv2.imshow("Output Frame", sr_frame)


    # close output window
    cv2.destroyAllWindows()

    # safely close video stream
    stream.stop()

    # safely close writer
    writer.close()


    # sleep 1 sec as the above video might still be rendering
    time.sleep(1)


    # format FFmpeg command to generate `Output_with_audio.mp4` by merging input_audio in above rendered `Output.mp4`
    ffmpeg_command = [
        "-y",
        "-i",
        "no_audio_"+video_name,
        "-i",
        input_audio,
        "-c:v",
        "copy",
        "-c:a",
        "copy",
        "-map",
        "0:v:0",
        "-map",
        "1:a:0",
        "-shortest",
        video_name,
    ]  # `-y` parameter is to overwrite outputfile if exists

    # execute FFmpeg command
    print('ffmpeg execute')
    writer.execute_ffmpeg_cmd(ffmpeg_command)

@app.route('/stop', methods=['GET'])
def stop_resources():
    if RunningProcess.sr_process is not None and RunningProcess.sr_process.is_alive():
        RunningProcess.sr_process.terminate()

    # get a recursive list of file paths that matches pattern including sub directories
    fileList = glob.glob('./dash/*.m4s', recursive=False)
    try:
        os.remove('./dash/output.mpd')
    except OSError:
        pass
    
    for filePath in fileList:
        try:
            os.remove(filePath)
        except OSError:
            print("Error while deleting file")

    return jsonify({
        "success" : True
    })

@app.route('/superresolve', methods=['POST'])
def post_superresolved():
    body = request.get_json()
    video_url = body.get('videoURL', None)
    audio_url = body.get('audioURL', None)
    if video_url is None or audio_url is None:
        abort(400)

    err = False
    try:
        if RunningProcess.sr_process is not None and RunningProcess.sr_process.is_alive():
            # terminate the process if it is running
            print('KIlled')
            RunningProcess.sr_process.terminate()

        RunningProcess.sr_process = Process(target=(stream_video), args=(video_url, audio_url))
        RunningProcess.sr_process.start()

    except Exception as e:
        print(str(e))
        err = True

    if err:
        abort(500)


    return jsonify(
                {"success": True}
            )


@app.route('/download', methods=['POST'])
def download_sr():
    body = request.get_json()
    video_url = body.get('videoURL', None)
    audio_url = body.get('audioURL', None)
    video_name = body.get('videoName', None)
    if video_url is None or audio_url is None or video_name is None:
        abort(400)

    err = False
    try:
        if RunningProcess.sr_process is not None and RunningProcess.sr_process.is_alive():
            # terminate the process if it is running
            print('KIlled')
            RunningProcess.sr_process.terminate()

        RunningProcess.sr_process = Process(target=(save_sr), args=(video_url, audio_url, video_name))
        RunningProcess.sr_process.start()

    except Exception as e:
        print(str(e))
        err = True

    if err:
        abort(500)


    return jsonify(
                {"success": True}
                )


@app.route('/dash/<file_name>', methods=['GET'])
def get_dash_file(file_name):
    print(file_name)
    return send_from_directory('dash', file_name)


@app.route('/show', methods=['GET'])
def preview():
    return render_template('index.html')


@app.errorhandler(400)
def bad_request(error):
    return jsonify({
                    "success": False,
                    "error": 400,
                    "message": "Bad Request."
                    }), 400

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({
                    "success": False,
                    "error": 500,
                    "message": "Internal Server Error."
                    }), 500