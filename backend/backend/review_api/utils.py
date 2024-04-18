import re

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


