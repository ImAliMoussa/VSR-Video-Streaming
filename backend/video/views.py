import json

from django.http import JsonResponse
from rest_framework import status

from .models import Video
# Create your views here.
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
    # try:
    #     video = Video.objects.get(pk=video_id)
    #     video_link = get_file_link(video.video_key_s3)
    #     audio_link = get_file_link(video.audio_key_s3)
    #     thumbnail_link = get_file_link(video.thumbnail_key_s3)
    #     response_json = {
    #         'videoLink': video_link,
    #         'audioLink': audio_link,
    #         'thumbnailLink': thumbnail_link
    #     }
    #     return JsonResponse(response_json, status=status.HTTP_200_OK)
    # except Video.DoesNotExist as e:
    #     print(e)
    #     return JsonResponse(status=status.HTTP_404_NOT_FOUND)

    try:
        video = Video.objects.get(pk=video_id)
        serializer = VideoSerializer(video)
        return JsonResponse(serializer.data, safe=False)
    except Video.DoesNotExist as e:
        print(e)
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)


def like_dislike_video(request, video_id: int):
    try:
        video = Video.objects.get(pk=video_id)
        json_data = json.loads(request.body)
        value = json_data['addValue']
        if value < 0:
            video.dislikes += 1
        elif value > 0:
            video.likes += 1
        video.save()
        return JsonResponse(status=status.HTTP_200_OK, data={})
    except Video.DoesNotExist as e:
        print(e)
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)


def increment_views_video(request, video_id: int):
    try:
        video = Video.objects.get(pk=video_id)
        video.views += 1
        video.save()
        return JsonResponse(status=status.HTTP_200_OK, data={})
    except Video.DoesNotExist as e:
        print(e)
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)
