from django.urls import path
from events.api.views import EventListAPIView,EventRegistrationAPIView,CancelRegistrationAPIView,UserRegistrationsAPIView

urlpatterns = [
    path('events/', EventListAPIView.as_view(), name='list-events'),
    path('events/register/', EventRegistrationAPIView.as_view(), name='register-event'),
    path('events/cancel/', CancelRegistrationAPIView.as_view(), name='cancel-registration'),
    path('events/registrations/', UserRegistrationsAPIView.as_view(), name='user-registrations')
]
