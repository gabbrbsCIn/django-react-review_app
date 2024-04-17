from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View
import google.generativeai as genai
import os
import json

api_key = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-pro')



class GetReview(View):
    def get(self, request):
        return JsonResponse({"msg": "olá mundo!"})

    def post(self, request):
        data = json.loads(request.body)
        data = data.get('data')

        script = f'Faça tipo um quiz de revisão de conteúdo (com 8 perguntas e 4 quatro alternativas cada, com o gabarito delas no fim), de acordo com este meu fichamento: {data}'
        
        quiz = model.generate_content(script)

        generated_text = quiz.text
        print(quiz.text)
        response_data = {
            "question": generated_text,
        }

        return JsonResponse(response_data)
        