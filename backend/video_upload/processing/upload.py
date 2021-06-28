import ntpath
import os.path

import magic
from django.conf import settings

from videoservice.boto3_client import s3_client, bucket_name


def upload_file(file_relative_path: str):
    try:
        s3_object_key = ntpath.basename(file_relative_path)
        file_full_path = os.path.join(settings.MEDIA_ROOT, s3_object_key)
        with magic.Magic(flags=magic.MAGIC_MIME_TYPE) as m:
            content_type = m.id_filename(file_full_path)
        extra_args = {"ContentType": content_type}
        s3_client.upload_file(file_full_path, bucket_name, s3_object_key, ExtraArgs=extra_args)
    except Exception as e:
        print(e)
