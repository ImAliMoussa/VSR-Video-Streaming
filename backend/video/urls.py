from django.urls import path
from django.views.decorators.http import require_safe

from .views import create_video, get_video, get_videos, like_dislike_video

urlpatterns = [
    path("video/create", require_safe(create_video)),
    path("video", require_safe(get_videos)),
    path("video/<int:video_id>", require_safe(get_video)),
    path("video/likes/<int:video_id>", require_safe(like_dislike_video)),
]
