import os
import boto3

session = boto3.session.Session()
client = session.client('s3',
                        region_name='nyc3',
                        endpoint_url='https://nyc3.digitaloceanspaces.com',
                        aws_access_key_id=os.getenv('SPACES_KEY'),
                        aws_secret_access_key=os.getenv('SPACES_SECRET'))