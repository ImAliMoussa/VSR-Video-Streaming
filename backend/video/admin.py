from django.contrib import admin

from .models import Video

# Register your models here.
# register 'Video' model so it can be accessed in the admin panel
admin.site.register(Video)
