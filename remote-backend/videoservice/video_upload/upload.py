import os
import boto3
from dotenv import load_dotenv
load_dotenv()


session = boto3.session.Session()
bucket_name = 'video-super-resolution'
s3_client = session.client('s3',
                           region_name='fra1',
                           endpoint_url='https://fra1.digitaloceanspaces.com',
                           aws_access_key_id=os.getenv('SPACES_KEY'),
                           aws_secret_access_key=os.getenv('SPACES_SECRET'))


def list_s3_bucket():
    response = s3_client.list_objects(Bucket=bucket_name)
    return [obj['Key'] for obj in response['Content']]


def upload_file(filename: str):
    try:
        # generate a key
        object_name = filename
        ExtraArgs = {'ContentType': "video/mp4"}
        s3_client.upload_file(file_name, bucket_name,
                              object_name, ExtraArgs=ExtraArgs)
    except ClientError as e:
        logging.error(e)


def get_video_link(video_key: str):
    one_day_in_seconds = 86400
    url = s3_client.generate_presigned_url(ClientMethod='get_object',
                                           Params={
                                               'Bucket': bucket_name,
                                               'Key': filename
                                           },
                                           ExpiresIn=one_day_in_seconds)
    return url
