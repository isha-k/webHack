from django.urls import path

from task_management.views.task_views import create_task_view, delete_task_view, get_leadership_board_view, get_level_points, get_suggestion, get_task_list_view, summarize_audio, update_task_view

urlpatterns = [
    path('add/',create_task_view,name='add_task'),
    path('update/<int:task_id>/',update_task_view,name='update_task'),
    path('get_level_points/',get_level_points,name='get_level_points'),
    path('get_suggestion/',get_suggestion,name='get_suggestion'),
    path('list/',get_task_list_view,name='get_list'),
    path('leadership-board/',get_leadership_board_view,name='leadership_board'),
    path('summarize-audio/',summarize_audio,name='summarize_audio'),
    path('delete/<int:task_id>/',delete_task_view,name='delete_task')
]