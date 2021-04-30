from django.http import JsonResponse

from .models import Video
# Create your views here.
from .serializers.video_serializer import VideoSerializer


def get_videos(request):
    videos = Video.objects.all()
    serializer = VideoSerializer(videos, many=True)
    return JsonResponse(serializer.data, safe=False)


def create_video(request):
    v = Video(
        title='This is a title',
        video_key_s3='BigBuckBunny.mp4',
        thumbnail_key_s3='thumbnail.jpeg',
        audio_key_s3='output_audio.aac',
    )
    v.save()
    return JsonResponse('1', safe=False)


def get_video(request, video_id: int):
    print(video_id)
    video = Video.objects.get(pk=video_id)

    serializer = VideoSerializer(video)

    return JsonResponse(serializer.data)
