from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='index'),
    path('signup', views.signup, name='signup'),
    path('settings', views.settings, name='settings'),
    path('upload', views.upload, name='upload'),
    path('signin', views.signin, name='signin'),
    path('like-post', views.like_post, name='like-post'),
    path('profile/<str:pk>', views.profile, name='profile'),
    path('follow', views.follow, name='follow'),
    path('search', views.search, name='search'),
    path('logout', views.logout, name='logout')
]