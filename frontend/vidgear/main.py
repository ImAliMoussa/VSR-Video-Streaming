import cv2

import sr
from vidgear.gears import CamGear, StreamGear

perform_super_resolution = True

stream = CamGear(
    source="https://video-super-resolution.fra1.digitaloceanspaces.com/BigBuckBunny.mp4",
    logging=True,
).start()

# activate Single-Source Mode and various streams, along with custom audio
stream_params = {
    # "-input_framerate": stream.framerate
    "-clear_prev_assets": True,
    "-livestream": False,
    "-audio": "https://video-super-resolution.fra1.digitaloceanspaces.com/output_audio.aac",
}

# # describe a suitable manifest-file location/name and assign params
streamer = StreamGear(output="output/dash_out.mpd", **stream_params)

while True:
    frame = stream.read()
    if frame is None:
        break

    resized = cv2.resize(frame, (224, 100), interpolation=cv2.INTER_AREA)
    if perform_super_resolution:
        super_res_frame = sr.super_resolve(resized)
        print("max value : ", super_res_frame[0][0])
        streamer.stream(super_res_frame)
    else:
        streamer.stream(resized)

    # Show output window
    # cv2.imshow("Output Frame", frame)

    # check for 'q' key if pressed
    key = cv2.waitKey(1) & 0xFF

    # time.sleep(0.03)
    if key == ord("q"):
        break

# close output window
cv2.destroyAllWindows()
# safely close video stream
stream.stop()
# safely close streamer
streamer.terminate()
