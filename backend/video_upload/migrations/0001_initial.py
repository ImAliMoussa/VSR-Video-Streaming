# Generated by Django 3.2 on 2021-05-05 19:34

import datetime

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='')),
                ('remark', models.CharField(max_length=20)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('video_key_s3', models.CharField(max_length=128)),
                ('upload_date', models.DateTimeField(default=datetime.datetime.now)),
                ('thumbnail_key_s3', models.CharField(max_length=128)),
                ('audio_key_s3', models.CharField(max_length=128)),
            ],
        ),
    ]