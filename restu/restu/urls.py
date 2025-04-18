"""
URL configuration for restu project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from BASE.views import *
from django.contrib.auth import views as auth_views



urlpatterns = [
    path('admin/', admin.site.urls),
    path('login-redirect/', login_redirect, name='login_redirect'),
    path('register/', register_view, name='register'),
    path('',home),
    path('about/',about,name='about'),
    path('dashboard/', dashboard, name='dashboard'),
    path('item/<int:id>/', single_item, name='single_item'),
    path('menu/',menu,name='menu'),
    path('verify/', verify_email, name='verify_email'),
    path('cancel_order/<int:order_id>/', cancel_order, name='cancel_order'),
    path('get-items/<int:cat_id>/',get_items_by_category, name='get_items_by_category'),
    path('order/',order,name='order'),
    path('logout/',logout_view, name='logout'),
    path('success/',success,name='success'),
    path('login/', login_view, name='login'),
]


  
