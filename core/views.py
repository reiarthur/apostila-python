from django.shortcuts import render
from django.views.generic import DetailView
from .models import Chapter

# Create your views here.

class ChapterDetail(DetailView):
    model = Chapter
    template_name = 'core/detail.html'
    context_object_name = 'chapter'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['sections'] = self.get_object().section_set.all()
        context['previous'] = self.get_object().previous_chapter
        context['next'] = self.get_object().next_chapter
        return context