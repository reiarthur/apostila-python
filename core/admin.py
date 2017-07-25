from django.contrib import admin
from .models import Section, Chapter
# Register your models here.

class SectionInline(admin.TabularInline):
    model = Section
    
class ChapterAdmin(admin.ModelAdmin):
    inlines = [SectionInline,]
    
admin.site.register(Chapter, ChapterAdmin)