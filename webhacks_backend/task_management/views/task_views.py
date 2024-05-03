from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from task_management.services.task_service import create_task_service, update_task_service


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_task_view(request):
    data, status_code = create_task_service(request.data, request.user)
    return Response(data, status=status_code)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_task_view(request, task_id):
    data, status_code = update_task_service(request.data, task_id)
    return Response(data, status=status_code)