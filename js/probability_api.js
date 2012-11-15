// здесь описаны функции вычисления вероятностей.

var questions_statistic = get_questions()
var animals_statistic = get_animals()


var p_q_a_if_c={} //{[question_id, answer_id, animal_id]: probability}
var p_c={}	//{animal_id:probability}. Здесь для каждого животного храним вероятность того, что было загадано именно оно.
var questions_answers_count = -1

function getQuestionById(id){
	for(key in questions_statistic){
		if(questions_statistic[key].question_id == id){
			return questions_statistic[key]
		}
	}
}

function getAnimalById(id){
	for(key in animals_statistic){
		if(animals_statistic[key].id == id){
			return animals_statistic[key]
		}
	}
}

function N_Q_A(){
	//Число пар вопрос-ответ в базе
	$.post("/ajax/qa_count",
			function(data){
		questions_answers_count = data.count - 0
	})
}


function P_C(animal_id){
	//Вероятность P(C) что было загадано животное C
	if(p_c[animal_id]!=undefined){
		return p_c[animal_id]
	}
	numerator1 = 1
	denumerator1 = animals_statistic.length
	$(animals_statistic).each(function(){
		if(this.id == animal_id){
			numerator1+=this.statistic_count
		}
		denumerator1+=this.statistic_count
	})
	
	p_c[animal_id] = numerator1/denumerator1
	return p_c[animal_id]
}

function P_Q_A_if_C(question_id, answer_id, animal_id){
	//P(Q,A|C) - вероятность что был задан вопрос Q и ответ на него A если известно, что животное C

	good_results = 1
	all_results = questions_answers_count
	$(animals_statistic).each(function(n){
		if(this.id == animal_id){
			$(this.qa).each(function(n){
				if(this.q_id == question_id && this.a_id == answer_id){
					good_results++;
				}
			})
		}
		all_results+=this.qa.length
	})
	
	return good_results/all_results
}

function P_C_if_Q_A(question_id, answer_id, animal_id){
	//Вероятность P(C|Q,A) - выпадения животного С если был задан вопрос Q и на него получен ответ C
	numerator2 = P_Q_A_if_C(question_id, answer_id, animal_id)*P_C(animal_id)
	denumerator2 = 0
	$(animals_statistic).each(function(n){
		
		denumerator2+=P_Q_A_if_C(question_id, answer_id, this.id)*P_C(this.id)
	})
	return numerator2/denumerator2
}

function H_Q_A(question_id, answer_id){
	//Вычисляет энтропию пары вопрос-ответ H(Q,A)
	ret = 0
	$(animals_statistic).each(function(){
		var value = P_C_if_Q_A(question_id, answer_id, this.id)
		ret += value*Math.log(value)
	})
	return -ret
}

function P_Q_if_C(question_id, animal_id){
	P_Q_if_C_summ=0.0
	var question = getQuestionById(question_id)
	$(question.answers).each(function(){
				P_Q_if_C_summ = P_Q_if_C_summ + P_Q_A_if_C(question_id, this.answer_id, animal_id)
			})

	return P_Q_if_C_summ
}

function P_A_if_Q(question_id, answer_id){
	P_A_if_Q_summ = 0
	$(animals_statistic).each(function(){
		P_A_if_Q_summ = P_Q_A_if_C(question_id, answer_id, this.id)*P_C(this.id)/P_Q_if_C(question_id, this.id)
	})
	return P_A_if_Q_summ
}

function H_Q(question_id){
	//возвращает H(Q) - энтропию вопроса
	ret2=0
	var question = getQuestionById(question_id)
	$(question.answers).each(function(n){
				ret2+=H_Q_A(question_id, this.answer_id)*P_A_if_Q(question_id, this.answer_id)
			})

	return ret2
	
}



