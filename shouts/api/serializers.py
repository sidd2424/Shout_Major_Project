from rest_framework import serializers
from accounts.models import Profile
from friends.models import Friends
from django.db.models import Q
from posts.models import Posts,ShoutComment,ShoutLike,ShoutReport


class FriendsSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(
        queryset=Profile.objects.all(),
        slug_field='username'

    )
    receiver = serializers.SlugRelatedField(
        queryset=Profile.objects.all(),
        slug_field='username'

    )

    class Meta:
        model = Friends
        fields = [
            'id',
            'sender',
            'receiver',
            'is_friend',
        ]


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model=Profile
        
        friends=serializers.SlugRelatedField(
            queryset=Profile.objects.all(),
            many=True,
            slug_field='username',
        )
        fields="__all__"

    

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Posts
        
       
        fields="__all__"
            
    
    def to_representation(self, instance):
        rep = super(PostsSerializer, self).to_representation(instance)
        rep['username'] = instance.username.username
        return rep

# =================Like and Comment serializers=================
class CommentSerializer(serializers.ModelSerializer):

    # date= datetime.strftime(ShoutComment.date,"%Y-%m-%d")
    shout_id = serializers.SlugRelatedField(
        queryset = Posts.objects.all(),
        # many = True,
        slug_field = 'post_id',
    )

    user_id = serializers.SlugRelatedField(
        queryset = Profile.objects.all(),
        # many = True,
        slug_field = 'user_id',
    )
    class Meta:
        model = ShoutComment

        fields = [
            'id',
            'shout_id',
            'comment',
            'date',
            'user_id',
        ]

class LikeSerializer(serializers.ModelSerializer):

    shout_id = serializers.SlugRelatedField(
        queryset = Posts.objects.all(),
        slug_field = 'post_id'
    )

    user_id = serializers.SlugRelatedField(
        queryset = Profile.objects.all(),
        slug_field = 'user_id',
    )

    class Meta:
        model = ShoutLike

        fields = [
            'id',
            'shout_id',
            'user_id',
        ]

class ReportSerializer(serializers.ModelSerializer):
    
    shout_id = serializers.SlugRelatedField(
        queryset = Posts.objects.all(),
        slug_field = 'post_id'
    )

    user_id = serializers.SlugRelatedField(
        queryset = Profile.objects.all(),
        slug_field = 'user_id',
    )

    class Meta:
        model = ShoutReport

        fields = [
            'id',
            'shout_id',
            'user_id',
            'report_type'
        ]
