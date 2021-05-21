import ntpath

from videoservice.boto3_client import bucket_name, s3_client


def list_s3_bucket():
    response = s3_client.list_objects(Bucket=bucket_name)
    return [obj["Key"] for obj in response["Contents"]]


def get_file_link(file_key: str):
    one_day_in_seconds = 86400
    file_key = ntpath.basename(file_key)
    url = s3_client.generate_presigned_url(
        ClientMethod="get_object",
        Params={"Bucket": bucket_name, "Key": file_key},
        ExpiresIn=one_day_in_seconds,
    )
    return url
