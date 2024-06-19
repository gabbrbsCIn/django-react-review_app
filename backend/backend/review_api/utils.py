import re
import os
import google.generativeai as genai
import json

from .models import Revision, Quiz, Question, Choice
from django.contrib.auth.models import User
from django.http import JsonResponse

api_key = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-pro')


def parse_quiz(quiz_text):
    questions_and_answers = re.split(r'\n\n+', quiz_text.strip())

    index = questions_and_answers.index("**Gabarito:**")

    quiz_dict = {}

    for qa in questions_and_answers[:index]:
        q_match = re.match(r'\*\*(\d+)\. (.+)\*\*', qa) # Padrão do Título da Questão
        if q_match:
            q_num = q_match.group(1)
            q_text = q_match.group(2)
            answers = re.findall(r'\((.)\) (.+)', qa) #Padrão das alternativas
            quiz_dict[q_num] = {'question': q_text, 'answers': dict(answers)}

    correct_answers = re.findall(r'\d+\. \((.)\)', quiz_text[index:])
    for i, ans in enumerate(correct_answers, start=1):
        quiz_dict[str(i)]['correct_answer'] = ans

    return(quiz_dict)




def generate_quiz(data):
    script = f'''Faça tipo um quiz de revisão de conteúdo (com 8 perguntas e 4 quatro alternativas cada, com o gabarito delas no fim)  de acordo com este meu fichamento: {data}. Use esse MODELO como base: **Quiz de Revisão**

    **1. (Pergunta da questão)**
    (a) x
    (b) y
    (c) z.
    (d) w
    
    **Gabarito:**

    1. (a)
    2. (b)
    '''
    
    quiz = model.generate_content(script)
    generated_text = quiz.text
    print(generated_text)
    quiz_dict = parse_quiz(generated_text)
    print(quiz_dict)

    return quiz_dict



def save_quiz(data, user, revision):
    user = User.objects.get(username=user)
    revision_instance = Revision.objects.get(id=revision['id'])
    number_of_quizzes_in_table = str(Quiz.objects.filter(revision=revision_instance).count() + 1)
    quiz = Quiz.objects.create(revision=revision_instance, title="Quiz - "+ revision['title']+" "+ number_of_quizzes_in_table)

    for key, value in data.items():
        question = Question.objects.create(quiz=quiz, text=value['question'])

        for choice_key, choice_value in value['answers'].items():
            is_correct = choice_key == value['correct_answer']

            choice = Choice.objects.create(question=question, text=choice_value, is_correct=is_correct)

    
    return JsonResponse({"msg":"Quiz salvo com sucesso!"})