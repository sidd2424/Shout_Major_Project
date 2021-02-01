from django.contrib import admin
from django.contrib.auth.models import Group

from .models import Profile
# Register your models here.


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["email", "username", "is_active" , "is_superuser"]




admin.site.unregister(Group)