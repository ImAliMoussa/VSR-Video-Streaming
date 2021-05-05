# Generated by Django 3.2 on 2021-04-28 02:20

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("video", "0003_video_audio_url"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="video",
            name="url",
        ),
        migrations.AddField(
            model_name="video",
            name="video_key_s3",
            field=models.CharField(default="BigBuckBunny.mp4", max_length=128),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="video",
            name="audio_url",
            field=models.CharField(max_length=128),
        ),
        migrations.AlterField(
            model_name="video",
            name="thumbnail_url",
            field=models.CharField(max_length=128),
        ),
    ]
