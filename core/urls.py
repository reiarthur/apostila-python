from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from core import views

urlpatterns = [
    url(r'^(?P<slug>[-\w]+)/$', views.ChapterDetail.as_view(), name="chapter_detail"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)