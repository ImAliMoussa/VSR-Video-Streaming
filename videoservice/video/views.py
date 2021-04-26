from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .models import Video
from video.serializers.video_serializer import VideoSerializer
# Create your views here.



def get_videos(request):
    videos = Video.objects.all()
    serializer = VideoSerializer(videos, many=True)
    return JsonResponse(serializer.data, safe=False)

def create_video(request):
    v = Video(title="Big Buck Bunny", thumbnail_url="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg")


def get_video(request, video_id: int):
    print(video_id)
    video = Video.objects.get(pk=video_id)

    serializer = VideoSerializer(video)

    return JsonResponse(serializer.data)