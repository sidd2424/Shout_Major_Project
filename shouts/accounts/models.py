from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class ProfileManager(BaseUserManager):

    def create_user(self, email, username,  password=None):

        if not email:
            return ValueError("Email is Required")

        if not username:
            return ValueError("UserName is Required")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.is_active = True

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password):

        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
        )

        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)

        return user


class Profile(AbstractBaseUser):

    user_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=100, unique=True)
    username = models.CharField(max_length=100, unique=True)
    date_joined = models.DateTimeField(
        verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    user_image = models.ImageField(
        default="avatar.png", upload_to="profile/", blank=True)
    bio = models.TextField(default="No bio.....", max_length=300)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = ProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
