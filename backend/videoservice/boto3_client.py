import logging

import boto3
import environ

env = environ.Env()

session = boto3.session.Session()
bucket_name = env("BUCKET_NAME")

logger = logging.getLogger(__name__)

s3_client = session.client(
    "s3",
    region_name=env("AWS_BUCKET_REGION"),
    endpoint_url=env("AWS_S3_ENDPOINT_URL"),
    aws_access_key_id=env("AWS_ACCESS_KEY"),
    aws_secret_access_key=env("AWS_SECRET_ACCESS_KEY"),
)
