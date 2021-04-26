# Generated by Django 3.2 on 2021-04-26 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=1000)),
                ('url', models.URLField()),
                ('upload_date', models.DateTimeField()),
                ('thumbnail_url', models.URLField()),
            ],
        ),
    ]
