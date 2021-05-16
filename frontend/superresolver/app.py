from flask import Flask, request, jsonify, abort, render_template, send_from_directory
from flask_cors import CORS
import json
import logging
from logging import Formatter, FileHandler
import sr
from vidgear.gears import CamGear, StreamGear

from multiprocessing import Process

import cv2

import time

app = Flask(__name__)

class RunningProcess:

    sr_process = None


# app.config.from_object('config')

# CORS(app, resources={r"*": {"origins": "*"}}, allow_headers="*")

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
    perform_super_resolution = False

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

    # # describe a suitable manifest-file location/name and assign params
    streamer = StreamGear(output=output, **stream_params)

    while True:
        frame = stream.read()
        if frame is None:
            break

        resized = cv2.resize(frame, (224, 100), interpolation=cv2.INTER_AREA)
        if perform_super_resolution:
            super_res_frame = sr.super_resolve(resized)
            # print("max value : ", super_res_frame[0][0])
            streamer.stream(super_res_frame)
        else:
            streamer.stream(resized)

    print('==========break=========1')
    print('==========break=========2')
    print('==========break=========3')

    # safely close video stream
    stream.stop()
    # safely close streamer
    streamer.terminate()


@app.route('/superresolve', methods=['GET'])
def get_superresolved():
    video_url = request.args.get('video', None)
    audio_url = request.args.get('audio', None)
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