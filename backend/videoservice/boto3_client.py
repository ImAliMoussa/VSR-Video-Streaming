import logging

import boto3
import environ

env = environ.Env()

session = boto3.session.Session()
bucket_name = env("BUCKET_NAME")

logger = logging.getLogger(__name__)

s3_client = session.client(
    "s3",
    region_name="fra1",
    endpoint_url="https://fra1.digitaloceanspaces.com",
    aws_access_key_id=env("SPACES_KEY"),
    aws_secret_access_key=env("SPACES_SECRET"),
)
