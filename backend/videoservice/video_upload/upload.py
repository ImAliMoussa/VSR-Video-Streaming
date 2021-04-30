import logging

import boto3
import environ
from botocore.exceptions import ClientError

env = environ.Env()
environ.Env.read_env()

session = boto3.session.Session()
bucket_name = 'video-super-resolution'
s3_client = session.client('s3',
                           region_name='fra1',
                           endpoint_url='https://fra1.digitaloceanspaces.com',
                           aws_access_key_id=env('SPACES_KEY'),
                           aws_secret_access_key=env('SPACES_SECRET'))


def list_s3_bucket():
    response = s3_client.list_objects(Bucket=bucket_name)
    return [obj['Key'] for obj in response['Content']]


def upload_file(filename: str):
    try:
        # generate a key
        object_name = filename
        extra_args = {'ContentType': "video/mp4"}
        s3_client.upload_file(filename, bucket_name,
                              object_name, ExtraArgs=extra_args)
    except ClientError as e:
        logging.error(e)


def get_video_link(video_key: str):
    one_day_in_seconds = 86400
    url = s3_client.generate_presigned_url(ClientMethod='get_object',
                                           Params={
                                               'Bucket': bucket_name,
                                               'Key': video_key
                                           },
                                           ExpiresIn=one_day_in_seconds)
    return url
