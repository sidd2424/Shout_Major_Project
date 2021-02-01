from django.contrib import admin
from .models import Posts,ShoutLike,ShoutReport,ShoutComment
# Register your models here.
@admin.register(Posts)
class PostsAdmin(admin.ModelAdmin):
    list_display = ['title']

@admin.register(ShoutLike)
class ShoutLikeAdmin(admin.ModelAdmin):
    list_display = ["id", "shout_id","user_id"]


@admin.register(ShoutReport)
class ShoutReportAdmin(admin.ModelAdmin):
    list_display = ["id", "shout_id","user_id","report_type"]


@admin.register(ShoutComment)
class ShoutCommentAdmin(admin.ModelAdmin):

    list_display = ["id", "shout_id","comment","date","user_id"]

