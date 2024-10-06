from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from events.models import Event, Registration
from events.api.serializers import EventSerializer, RegistrationSerializer
from django.utils.crypto import get_random_string


class EventListAPIView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class EventRegistrationAPIView(APIView):
    def post(self, request):
        event_id = request.data.get('event_id')
        event = get_object_or_404(Event, id=event_id)

        reservation_code = get_random_string(12)
        registration = Registration.objects.create(
            user=request.user, 
            event=event, 
            reservation_code=reservation_code
        )
        serializer = RegistrationSerializer(registration)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CancelRegistrationAPIView(APIView):
    def delete(self, request):
        reservation_code = request.data.get('reservation_code')
        registration = get_object_or_404(Registration, reservation_code=reservation_code)

        if registration.event.can_cancel():
            registration.delete()
            return Response({'message': 'Registration cancelled successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Cannot cancel this event registration'}, status=status.HTTP_400_BAD_REQUEST)
