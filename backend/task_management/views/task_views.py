from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from task_management.services.task_service import create_task_service, get_leadership_board_service, get_points_service, get_task_list_service, gpt_suggestion_service, update_task_service


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

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_level_points(request):
    data,status_code = get_points_service(request.user)
    return Response(data,status=status_code)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_suggestion(request):
    data,status_code = gpt_suggestion_service(request.user)
    return Response(data,status=status_code)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_task_list_view(request):
    data,status_code = get_task_list_service(request.user)
    return Response(data,status=status_code)


@api_view(["GET"])
def get_leadership_board_view(request):
    data,status_code = get_leadership_board_service()
    return Response(data,status=status_code)