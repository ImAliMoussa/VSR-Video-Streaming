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
    v = Video(title="Big Buck Bunny", url='https://video-super-resolution.fra1.digitaloceanspaces.com/BigBuckBunny.mp4', thumbnail_url="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg")
    v.save()
    return JsonResponse('1', safe=False)

def get_video(request, video_id: int):
    print(video_id)
    video = Video.objects.get(pk=video_id)

    serializer = VideoSerializer(video)

    return JsonResponse(serializer.data)