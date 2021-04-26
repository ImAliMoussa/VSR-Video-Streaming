from django.urls import path
from django.views.decorators.http import require_GET, require_POST, require_safe
from .views import *

urlpatterns = [
    path('video', require_safe(get_videos)),
    path('video/<int:video_id>', require_GET(get_video))
]