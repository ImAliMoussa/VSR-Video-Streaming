# Generated by Django 3.2.4 on 2021-07-11 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('video', '0007_auto_20210711_1640'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='duration',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='video',
            name='fps',
            field=models.IntegerField(default=0),
        ),
    ]