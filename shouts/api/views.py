from django.shortcuts import render
from .serializers import (
    FriendsSerializer,
    ProfileSerializer,
    UsersSerializer,
    PostsSerializer,
    CommentSerializer,
    LikeSerializer,
    ReportSerializer
    # FriendRequestSendSerializer
)

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from accounts.models import Profile
from friends.models import Friends
from rest_framework.permissions import IsAuthenticated
from posts.models import Posts,ShoutLike,ShoutComment, ShoutReport
from django.http import HttpResponse
# from django.contrib.auth.models import User


# class FriendsView(viewsets.ModelViewSet):
#     filter_obj = Profile.objects.get(username='shubham')
#     queryset = Friends.objects.filter(
#         sender=filter_obj, is_friend=True
#     ).union(
#         Friends.objects.filter(
#             receiver=filter_obj, is_friend=True
#         ))
#     serializer_class = FriendsSerializer


# Friends GET, PATCH, DELETE, POST methods

@api_view(['GET', 'PATCH', 'DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def FriendsAppView(request, pk):

    # Response for friend list show
    if request.method == 'GET':
        print(request.data)
        filter_obj = Profile.objects.get(user_id=pk)
        friends = Friends.objects.filter(
            sender=filter_obj, is_friend=True
        ).union(
            Friends.objects.filter(
                receiver=filter_obj, is_friend=True
            ))
        serializer = FriendsSerializer(friends, many=True)
        return Response(serializer.data)

# addin new request data in friends table
    if request.method == 'POST':
        list_data = request.data
        sender = Profile.objects.get(user_id=pk)
        receiver = Profile.objects.get(
            user_id=list_data['receiver']['user_id'])
        friends = {
            'sender': sender,
            'receiver': receiver
        }

        serializer = FriendsSerializer(data=friends)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# updating friends table data for accepting friend request or deleting it
    if request.method == 'PATCH':
        accept_data = request.data
        print("accept_data", accept_data['is_friend'])
        if accept_data['is_friend'] == False:
            change = {
                'is_friend': True
            }
            friends = Friends.objects.get(id=accept_data['id'])
            serializer = FriendsSerializer(friends, data=change, partial=True)
            if serializer.is_valid():
                print("False Patch serializer")
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            print("Not Valid False Patch serializer")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if accept_data['is_friend'] == True:
            print("--------true")
            friends = Friends.objects.get(id=accept_data['id'])
            friends.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

# Removing friend from friends list
    if request.method == 'DELETE':
        friends = Friends.objects.get(id=pk)
        friends.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# for seeing Profile data
class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


# friend request list
@api_view(['GET','PATCH', 'DELETE', 'POST'])
def FriendRequestList(request, pk):
    filter_obj = Profile.objects.get(user_id=pk)
    friends = Friends.objects.filter(
        receiver=filter_obj,
        is_friend=False
    )
    serializer = FriendsSerializer(friends, many=True)
    return Response(serializer.data)


# fetching list for making new friends
@api_view(['GET'])
def MakeNewFriends(request, pk):
    filter_obj = Profile.objects.get(user_id=pk)
    newfriends = Profile.objects.all().exclude(
        user_id__in=(Friends.objects.filter(sender=filter_obj)
                     .values_list('receiver')
                     .union(Friends.objects.filter(receiver=filter_obj))
                     .values_list('sender')))

    serializer = ProfileSerializer(newfriends, many=True)
    return Response(serializer.data)

# ===============Shouts======================================

class UserViewSet(viewsets.ModelViewSet):
    queryset=Profile.objects.all().order_by('username')
    serializer_class=UsersSerializer



@api_view(['GET','PATCH', 'DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def MyPostsViewSet(request,pk):
    print("MyViewSet")
    filter_obj = Profile.objects.get(user_id=pk)
    queryset=Posts.objects.filter(username=filter_obj).order_by('-date_posted')
    serializer=PostsSerializer(queryset,many=True)
    return Response(serializer.data)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def PostsViewSet(request):
    if request.method == 'GET':
        print(request.data)
        posts = Posts.objects.all().order_by('-date_posted')
        serializer = PostsSerializer(posts, many=True)
        return Response(serializer.data)

    if request.method=='POST':
        shout_data=request.data
        
      
        serializer=PostsSerializer(data=shout_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    

        
@api_view(['GET','PATCH','DELETE'])
@permission_classes([IsAuthenticated])
def PostsViewSetPatchDelete(request,pk):
    if request.method == 'GET':
        print(request.data)
        posts = Posts.objects.get(post_id=pk)
        serializer = PostsSerializer(posts)
        return Response(serializer.data)


    if request.method == 'PATCH':
        
        posts = Posts.objects.get(post_id=pk)
        
        serializer = PostsSerializer(instance=posts,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method=="DELETE":
        posts = Posts.objects.get(post_id=pk)
        posts.delete()
        return Response('Shout Deleted Successfully')


# ==============Likes and Comment Views===========================
class LikeViewSet(viewsets.ModelViewSet):
    queryset = ShoutLike.objects.all()
    serializer_class = LikeSerializer

    def get(self, request): 
        likes = ShoutLike.objects.all() 
        # count_like = ShoutLike.objects.raw('select count(*) from comment_like_report_shoutlike')
        # print(count_like)
        return HttpResponse(likes)

    def delete(self,request, pk):
            unlike = Posts.objects.get(id=pk)
            if request.id == unlike.id:
                ShoutLike.objects.get(id=pk).delete()
            return Response({'message':'Unlike!'},status=200)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = ShoutComment.objects.all()
    serializer_class = CommentSerializer 




# ===================== Report ============================



class ReportViewSet(viewsets.ModelViewSet):
    queryset = ShoutReport.objects.all()
    serializer_class = ReportSerializer   