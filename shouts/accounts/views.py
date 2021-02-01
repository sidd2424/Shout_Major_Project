# from django.shortcuts import render
from .models import Profile
from .serializers import ProfileSerializer ,LoginSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth import login , logout
from rest_framework import views
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
import base64

# Create your views here.


class ProfileViewSets(viewsets.ModelViewSet):

    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    

class LoginViewSets(views.APIView):


    #Handles Post Request containing email and password 
    #Authenticates User by passing it to Login Serializer
    def post(self, request):
        print(request.data)

        serializer = LoginSerializer(data=request.data)
        

        # if user is present it will not affect but if not request will not proceed
        # but response will be send back from here only
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data["user"]

        if user:
            login(request, user)

            image_data = base64.b64encode(user.user_image.read()).decode('utf-8')
            
            #To get token key of logged in User 
            token = Token.objects.get(user=user)
            return Response({"token" : token.key, "user_id" : user.user_id , "username":user.username,"email":user.email,"user_image":image_data,"bio":user.bio}, status=200)

        else:
            message = serializer.validated_data["message"]
            return Response({"message" : message})
        
        



        
        

        
        


         



