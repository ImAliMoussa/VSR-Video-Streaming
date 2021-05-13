from django.http import JsonResponse
from rest_framework import status

from .models import Video
# Create your views here.
from .presigned_link import get_file_link
from .serializers.video_serializer import VideoSerializer


def get_videos(request):
    videos = Video.objects.all()
    serializer = VideoSerializer(videos, many=True)
    return JsonResponse(serializer.data, safe=False)


def create_video(request):
    v = Video(
        title="This is a title",
        videoKeyS3="BigBuckBunny.mp4",
        thumbnailKeyS3="thumbnail.jpeg",
        audioKeyS3="output_audio.aac",
    )
    v.save()
    return JsonResponse("1", safe=False)


def get_video(request, video_id: int):
    try:
        video = Video.objects.get(pk=video_id)
        video_link = get_file_link(video.video_key_s3)
        audio_link = get_file_link(video.audio_key_s3)
        thumbnail_link = get_file_link(video.thumbnail_key_s3)
        response_json = {
            'videoLink': video_link,
            'audioLink': audio_link,
            'thumbnailLink': thumbnail_link
        }
        return JsonResponse(response_json, status=status.HTTP_200_OK)
    except Video.DoesNotExist as e:
        print(e)
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)
