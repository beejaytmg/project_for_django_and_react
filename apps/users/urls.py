
from django.urls import path
from .views import UserLoginView, UserRegisterView, UserProfileView
urlpatterns = [
    path('login/', UserLoginView.as_view(), name='user_login'),
    path('register/', UserRegisterView.as_view(), name='user_signup'),
    path('user-profile', UserProfileView.as_view(), name='user_profile' ),
]
