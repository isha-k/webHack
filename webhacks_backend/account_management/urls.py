from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from account_management.views.user_views import user_change_password, user_login, user_profile, user_registration

urlpatterns = [
    path('register/', user_registration, name='user-register'),
    path('login/', user_login, name='user-login'),
    path('profile/', user_profile, name='user-profile'),
    path('change-password/', user_change_password, name='user-change-password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]