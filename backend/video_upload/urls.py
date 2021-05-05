from django.urls import path

from .views import NewVideoUploadView

urlpatterns = [
    path(r'upload/', NewVideoUploadView.as_view(), name='video_upload'),
]
