from django.db import models
from django.utils import timezone

STATUS_CHOICES = (
        ('todo', 'Todo'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
    )

class Task(models.Model):
    user = models.ForeignKey('account_management.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    deadline = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='todo')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if self.pk is not None:  # the instance is being updated
            orig = Task.objects.get(pk=self.pk)
            if orig.status != 'completed' and self.status == 'completed':
                points = 5 if self.deadline > timezone.now() else 2
                TaskPointsTransaction.objects.update_or_create(task=self, defaults={'user': self.user, 'credit_points': points})
        super(Task, self).save(*args, **kwargs)    
    
    def __str__(self):
        return self.title
    
class TaskPointsTransaction(models.Model):
    user = models.ForeignKey('account_management.User', on_delete=models.CASCADE)
    task = models.OneToOneField(Task, on_delete=models.CASCADE)
    credit_points = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.task.title
    
class Levels(models.Model):
    level_name = models.IntegerField()
    minimum_points = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.level
    
class gpt_suggestions(models.Model): 
    user = models.ForeignKey('account_management.User', on_delete=models.CASCADE)
    user_message = models.TextField()
    gpt_response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.suggestion