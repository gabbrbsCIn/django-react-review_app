from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View
from . import utils

import json



class GetReview(View):
    def get(self, request):
        return JsonResponse({"msg": "olá mundo!"})

    def post(self, request):
        data = json.loads(request.body)
        data = data.get('data')

        quiz_dict = utils.generate_quiz(data)

        return JsonResponse(quiz_dict)
        