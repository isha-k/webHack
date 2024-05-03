from django.urls import path

from task_management.views.task_views import create_task_view, update_task_view

urlpatterns = [
    path('add/',create_task_view,name='add_task'),
    path('update/<int:task_id>/',update_task_view,name='update_task')
]