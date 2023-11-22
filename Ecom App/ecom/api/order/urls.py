from rest_framework import routers
from django.urls import path,include
from . import views

router = routers.DefaultRouter()
router.register(r'', views.orderViewSet)

urlpatterns = [
     path('',include(router.urls)),
     path('add/<str:id>/<str:token>/',views.add,name='order.add'),
     path('history/<str:id>/<str:token>',views.history,name='history'),
     path('return/<str:id>/<str:token>',views.orderreturn,name='orderreturn')

]
