from rest_framework import serializers , exceptions
from .models import Profile
from django.contrib.auth import authenticate
from django.contrib.auth.backends import UserModel


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model  = Profile
        #To serialize all fields in ProfileSerializer
        fields = '__all__' 

    

class LoginSerializer(serializers.Serializer):

    email = serializers.CharField()
    password = serializers.CharField()

    print(UserModel)

    def validate(self, data):
        email = data.get("email", "")
        password = data.get("password", "")
        
        #To check whether request has email and password
        if email and password : 
            
            #To authenticate if the user exits in UserModel or not
            user = UserModel.objects.get(email=email, password=password)

            if user:
                if user.is_active:
                    data["user"] = user     
                                 
                else:
                    msg = "User is deactivated"
                    data["message"] = msg
                    

            else:
                data["user"] = None
                msg = "Given Credentials are wrong"
                data["message"] = msg

        else:
            msg = "Please Provide email and password"
            data["message"] = msg

        return data

    

