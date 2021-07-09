from concurrent.futures import ThreadPoolExecutor
from django.http import HttpResponse
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .processing.process_and_upload import process_and_upload_video
from .serializers import UploadVideoSerializer

max_worker_threads = 2
executor = ThreadPoolExecutor(max_workers=max_worker_threads)


class NewVideoUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        serializer = UploadVideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            executor.submit(process_and_upload_video, serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def home(request):
    return HttpResponse('Hi, from the homepage :(')
