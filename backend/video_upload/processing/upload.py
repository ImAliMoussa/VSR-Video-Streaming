import logging
import ntpath
import os.path
import traceback

import boto3
import environ
import magic
from botocore.exceptions import ClientError
from django.conf import settings

env = environ.Env()

session = boto3.session.Session()
bucket_name = "video-super-resolution"

mime = magic.Magic(mime=True)

s3_client = session.client(
    "s3",
    region_name="fra1",
    endpoint_url="https://fra1.digitaloceanspaces.com",
    aws_access_key_id=env("SPACES_KEY"),
    aws_secret_access_key=env("SPACES_SECRET"),
)


def list_s3_bucket():
    response = s3_client.list_objects(Bucket=bucket_name)
    return [obj["Key"] for obj in response["Contents"]]


def upload_file(file_relative_path: str):
    try:
        # generate a key
        s3_object_key = ntpath.basename(file_relative_path)
        file_full_path = os.path.join(settings.MEDIA_ROOT, s3_object_key)
        extra_args = {"ContentType": mime.from_file(file_full_path)}
        s3_client.upload_file(file_full_path, bucket_name, s3_object_key, ExtraArgs=extra_args)
    except ClientError as e:
        traceback.print_exc()


def get_video_link(video_key: str):
    one_day_in_seconds = 86400
    url = s3_client.generate_presigned_url(
        ClientMethod="get_object",
        Params={"Bucket": bucket_name, "Key": video_key},
        ExpiresIn=one_day_in_seconds,
    )
    return url
