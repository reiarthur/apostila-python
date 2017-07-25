from django.db import models
from tinymce.models import HTMLField

class Chapter(models.Model):
    title = models.CharField(max_length=25)
    slug = models.SlugField(max_length=30)
    next_chapter = models.ForeignKey('self', on_delete=models.CASCADE, default=None, blank=True, null=True, related_name= "%(class)s_next")
    previous_chapter = models.ForeignKey('self', on_delete=models.CASCADE, default=None, blank=True, null=True)
    
    def __str__(self):
        return self.title

class Section(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    title = models.CharField(max_length=25)
    content = HTMLField()

    def __str__(self):
        return self.title
    
