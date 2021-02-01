from django.contrib import admin
from .models import Friends

# Register your models here.

@admin.register(Friends)
class FriendsAdmin(admin.ModelAdmin):
    list_display = ['is_friend']