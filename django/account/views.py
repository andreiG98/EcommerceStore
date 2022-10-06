import json

from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login


def get_csrf(request):
    response = JsonResponse({"Info": "Success - Set CSRF Cookie"})
    response["X-CSRFToken"] = get_token(request)
    response["Access-Control-Allow-Credentials"] = "true"

    return response


@require_POST
def loginView(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonResponse({"info": "Username and password is needed"})

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({"info": "User does not exist"}, status=400)

    login(request, user)

    response = JsonResponse({"info": "User logged in succesfully"})
    response["Access-Control-Allow-Credentials"] = "true"

    return response
