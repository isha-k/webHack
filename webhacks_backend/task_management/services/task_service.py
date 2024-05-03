from rest_framework import status

from task_management.models.task_model import Task
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