from rest_framework import status
from django.db.models import Sum

import json
from openai import OpenAI
from account_management import models
from task_management.models.task_model import Task, TaskPointsTransaction
from task_management.serializers.task_serializers import AddTaskSerializer, DisplayTaskSerializer, UpdateTaskStatusSerializer
import os
from openai import OpenAI

# Get OpenAI API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=OPENAI_API_KEY)



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

def delete_task_service(task_id):
    task = Task.objects.get(id=task_id)
    task.delete()
    return ({"message": "Task Deleted Successfully"}, status.HTTP_200_OK)

def get_task_list_service(user):
    tasks = Task.objects.filter(user=user)
    serializer = DisplayTaskSerializer(tasks, many=True)
    return (serializer.data, status.HTTP_200_OK)

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

def gpt_suggestion_service(user):
    
    tasks = Task.objects.filter(user=user)
    task_list = []

    for task in tasks:
        task_str = f"Title: {task.title}, Description: {task.description}, Deadline: {task.deadline}"
        task_list.append(task_str)

    # Join all task strings into a single string
    task_string = "\n".join(task_list)
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={"type": "text"},
        messages=[
            {"role": "system", "content": "You are a helpful time management teacher."},
            {"role": "user", "content": "my task schedule are "+task_string+"please give me suggestion to improve my schedule, just give me suggestions in 100 words"}
        ]
    )
    return response.choices[0].message.content, status.HTTP_200_OK 



def get_leadership_board_service():
    users = models.User.objects.all()
    user_points = []
    for user in users:
        transactions = TaskPointsTransaction.objects.filter(user=user)
        total_points = 0 if not transactions else transactions.aggregate(Sum('credit_points'))['credit_points__sum']
        user_points.append({"user": user.name, "points": total_points})

    # Sort the list in descending order based on points
    user_points.sort(key=lambda x: x['points'], reverse=True)

    # Return only the top 10 users
    top_10_users = user_points[:10]

    return top_10_users, status.HTTP_200_OK


def summarize_audio_service(audio):
   

    return "none", status.HTTP_200_OK
