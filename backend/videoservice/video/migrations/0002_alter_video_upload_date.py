# Generated by Django 3.2 on 2021-04-26 23:44

import datetime

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('video', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='upload_date',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]