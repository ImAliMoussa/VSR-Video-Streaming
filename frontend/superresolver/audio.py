# import required libraries
from vidgear.gears import WriteGear

# define a valid url
url_to_stream = (
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
)

# Define writer with default parameters
writer = WriteGear(output_filename="Output.mp4", logging=True)

# format command to convert stream audio as 'output_audio.aac' as list
ffmpeg_command_to_save_audio = [
    "-y",
    "-i",
    url_to_stream,
    "output_audio.aac",
]  # `-y` parameter is to overwrite outputfile if exists

# execute FFmpeg command
writer.execute_ffmpeg_cmd(ffmpeg_command_to_save_audio)

# safely close writer
writer.close()
