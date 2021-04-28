from rest_framework import serializers


# if you use serializers.Serializer u need to
#  define the model fields in the class

# otherwise use serializers.ModelSerializer
# class VideoSerializer(serializers.Serializer):
#     title = serializers.CharField()
#     url = serializers.URLField()
#     upload_date = serializers.DateTimeField()
#     thumbnail_url = serializers.URLField()

#     def create(self, validated_data):
#         return Video.objects.create(validated_data)

#     def update(self, instance: Video, validated_data) -> Video:
#         instance.url = validated_data.get('url', instance.url)
#         instance.upload_date = validated_data.get('upload_date', instance.upload_date)
#         instance.title = validated_data.get('title', instance.title)
#         instance.thumbnail_url = validated_data.get('thumbnail_url', instance.thumbnail_url)
#         instance.save()

#         return instance
import sys

from video.models import Video

print('curr sys path', sys.path)

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'url', 'title', 'thumbnail_url', 'upload_date']
