from rest_framework import status
from django.db.models import Sum

from account_management import models
from task_management.models.task_model import Task, TaskPointsTransaction
from task_management.serializers.task_serializers import AddTaskSerializer, UpdateTaskStatusSerializer



def create_task_service(data, user):
    serializer = AddTaskSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=user)
        return ({"message": "Task Added Successfully ", "data": serializer.data}, status.HTTP_201_CREATED)
    return (serializer.errors, status.HTTP_400_BAD_REQUEST)

def update_task_service(data, task_id):
    task = Task.objects.get(id=task_id)
    serializer = UpdateTaskStatusSerializer(task, data=data)
    if serializer.is_valid():
        serializer.save()
        return ({"message": "Task Updated Successfully", "data": serializer.data}, status.HTTP_200_OK)
    return (serializer.errors, status.HTTP_400_BAD_REQUEST)

def get_points_service(user):
    transactions = TaskPointsTransaction.objects.filter(user=user)
    total_points = 0 if not transactions else transactions.aggregate(Sum('credit_points'))['credit_points__sum']
    
    if total_points < 100:
        level = 'Level 0'
    elif 100 <= total_points < 200:
        level = 'Level 1'
    elif 200 <= total_points < 300:
        level = 'Level 2'
    else:
        level = 'Level 3'

    return {"total_points": total_points, "level": level}, status.HTTP_200_OK