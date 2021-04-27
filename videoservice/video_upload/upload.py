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

response = s3_client.list_objects(Bucket=bucket_name)
for obj in response['Contents']:
    print(obj['Key'])

filename = 'ForBiggerBlazes.mp4'

try:
    file_name = filename
    object_name = filename
    ExtraArgs={'ContentType': "video/mp4"} 
    response = s3_client.upload_file(file_name, bucket_name, object_name, ExtraArgs=ExtraArgs)
    print('response : ', response, '\n\n')
except ClientError as e:
    logging.error(e)

url = s3_client.generate_presigned_url(ClientMethod='get_object',
                                    Params={'Bucket': bucket_name,
                                            'Key': filename},
                                    ExpiresIn=300)

print(url)
