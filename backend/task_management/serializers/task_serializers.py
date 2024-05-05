from rest_framework import serializers

from task_management.models.task_model import Task

class DisplayTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id","title", "description", "status","deadline","created_at"]

class AddTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "title", "description", "status","deadline"]

class UpdateTaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "status"]
