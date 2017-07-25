from django.conf.urls import url
from core import views

urlpatterns = [
    url(r'^(?P<slug>[-\w]+)/$', views.ChapterDetail.as_view(), name="chapter_detail"),
]