FROM borda/docker_python-opencv-ffmpeg:cpu-py3.7-cv4.5.2


ADD docker-requirements.txt /app/requirements.txt

RUN set -ex \
    && apt update \
    && pip3 install --upgrade pip \
    && pip3 install --no-cache-dir -r /app/requirements.txt 

ADD backend /app
WORKDIR /app

EXPOSE 8000

# CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "videoservice.wsgi:application"]
CMD ["gunicorn", "--bind", ":8000", "videoservice.wsgi:application"]
