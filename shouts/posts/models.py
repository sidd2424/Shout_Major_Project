from django.db import models
import uuid
from accounts.models import Profile
from django.utils import timezone
from datetime import datetime,date
# Create your models here.

class Posts(models.Model):
    TEXT = 'T'
    IMAGE = 'I'
    VIDEO = 'V'
    AUDIO = 'A'
    
    POST_TYPE = [
        (TEXT, 'Text'),
        (IMAGE, 'Image'),
        (VIDEO, 'Video'),
        (AUDIO, 'Audio'),
        
    ]
    
    post_id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable = False)
    post_type = models.CharField(
        max_length=2,
        choices=POST_TYPE,
        default=TEXT,
    )
    title=models.CharField(max_length=500,default="",null=True)
    description=models.CharField(max_length=1000,default="",null=True)
    date_posted = models.DateTimeField(blank=True,null=True,default=timezone.now)
    username=models.ForeignKey(Profile, on_delete=models.CASCADE,related_name="author")
    media=models.FileField(upload_to='media/post',default="",null=True,blank=True)
    

    def __str__(self):
        return str(self.title)

class ShoutComment(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shout_id = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='UserPost',default="", null=True)
    comment = models.CharField(max_length=256,null=True)
    date = models.DateTimeField(default=datetime.now)
    # updated_at = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='Comment_User', default="",null=True)

    #name = models.CharField(max_length=255)

    def __str__(self):
        return str(self.id)

LIKE_CHOICES = (
    ('Like','Like'),
    ('Unlike','Unlike'),
)
class ShoutLike(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shout_id = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='LikedPost',default="", editable=False, null=True)
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='Like_User', default="",editable=False,null=True)
    #value = models.CharField(choices=LIKE_CHOICES, default='Like',max_length=10)

    def __str__(self):
        return str(self.id)


class ShoutReport(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shout_id = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='ReportedPost', null=True)
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='Report_User', null=True)
    report_type = models.CharField(max_length=256,null=True)
    
    def __str__(self):
        return str(self.id)