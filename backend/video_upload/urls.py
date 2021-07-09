from django.urls import path

from .views import NewVideoUploadView, home

urlpatterns = [
    path(r'upload/', NewVideoUploadView.as_view(), name='video_upload'),
    path('', home, name='home'),
]
