# Generated by Django 3.1.4 on 2021-01-04 04:54

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShoutLike',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('shout_id', models.ForeignKey(default='', editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='LikedPost', to='posts.posts')),
                ('user_id', models.ForeignKey(default='', editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Like_User', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ShoutComment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('comment', models.CharField(max_length=256, null=True)),
                ('date', models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('shout_id', models.ForeignKey(default='', editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='UserPost', to='posts.posts')),
                ('user_id', models.ForeignKey(default='', editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Comment_User', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]