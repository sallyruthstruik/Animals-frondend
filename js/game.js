
var questions	//тут храним оставшиеся
var questions_probabilities = {}
var answers = []		//тут храним ответы на отправку
var question 	//Тут храним рекущий вопрос
var answer		//Тут храним id текущего ответа

$(function(){
	RefreshQuestionProbabilities()
	showBestQuestions()})

function getBestQuestion(){
	var min=1
	var k = 0
	for(key in questions_probabilities){
		var element = questions_probabilities[key]
		if(element<=min){
			min = element
			k = key
		}
	}
	var index = 0
	for(tt in questions){
		if(questions[tt].question_id == k){
			index = tt
			break
		}
	}
	return questions.splice(index,1)[0]
}

function sendAnimalStatistics(animal){
	var string = JSON.stringify(answers)
	$.post(
		"/ajax/answers",
		{answers:string,
		animal:animal},
		function(data){
			if(data.response == "ok"){
				$("div[id=question]").html("Спасибо за Ваш ответ<br><a href='/'>На главную</a>")
			}else{
				$("div[id=question]").html(data.response+"<br><a href='/'>На главную</a>")
			}
		})
}

function checkAnswers(){
	$("div[id=answers]>ul>li input").each(
			function(n){
				if(this.checked){
					answer = this.id
					answers.push([question.question_id.toString(), this.id])
				}
			}			
		)
	RefreshQuestionProbabilities(question.question_id, answer)
	showBestQuestions()
}




function iDontKnowTheAnimal(){
	checkAnswers()
	
	$("div[id=question]").html(
		"Мы не знаем кто это. Введите, пожалуйста, название животного<br><input type = 'text'  name='animal'><br><input type='submit'>"
		)
	$("div[id=answers]").html("")
	$("div[id=question]>input[type=submit]")[0].onclick = function(){
				sendAnimalStatistics($("input[name=animal]")[0].value)
			}
	}

function oneQuestion(){
	question = getBestQuestion()

	
	$("div[id=question]").html(question.question)	
	$(question.answers).each(
		function(n){
			if(n==0){
				$("div[id=answers]>ul").html("<li>"+this.answer+"<input type = 'radio' name = 'answer' id = '"+this.answer_id+"'></li>")
			}else{
				$("div[id=answers]>ul>li:last").append("<li>"+this.answer+"<input type = 'radio' name = 'answer' id = '"+this.answer_id+"'></li>")
			}
		}
	)
	if($("div[id = answers]>input[type=submit]").length == 0){
		$("div[id=answers]").append("<input type = 'submit'>")
	}
	
	if(questions.length == 0){
		var click = function(){
			iDontKnowTheAnimal()
		}
			
	}else{
		var click = function(){
			checkAnswers()
			return oneQuestion()
		}
}


	$("div[id = answers]>input[type=submit]")[0].onclick = click				
}

/*-------------------------- Отсюда идет часть, связанная с вычислением вероятностей ------------------------------*/



function RefreshQuestionProbabilities(qid, ansid){
	//обновляет все вероятностные векторы.

	for(key in animals_statistic){
		var animal = animals_statistic[key]
		var id = animal.id
		if(qid!=undefined && ansid!=undefined){
			if(id == 56) console.dir(p_c[id]);
			p_c[id] = P_C_if_Q_A(qid, ansid, id)
			if(id == 56) console.dir(p_c[id]);
		}else{
			p_c[id] = P_C(id)
		}
	}
	
	questions_probabilities = {}
	for(key in questions_statistic){
		questions_probabilities[questions_statistic[key].question_id] = H_Q(questions_statistic[key].question_id)
	}
	
}

function objectSort(obj){
	var tuple = []
	for(key in obj){
		tuple.push([key, obj[key]])
	}
	tuple.sort(function(i,ii){
		return i[1]-ii[1]>0?-1:1
	})
	return tuple
}

function showBestQuestions(){
	
	$("#probabilities>tbody").html("<tr></tr>")
	$(objectSort(questions_probabilities)).each(function(n){
		var question = getQuestionById(this[0])
		line = $("<tr><td></td><td></td></tr>")
		line.children("td:first").text(question.question)
		line.children("td:nth-child(2)").text(this[1].toString())
		$("#probabilities>tbody>tr:last").append(line)
	})
	showBestAnimals()
}

function showBestAnimals(){
	
	$("#animals>tbody").html("<tr></tr>")
	$(objectSort(p_c)).each(function(n){
		var animal = getAnimalById(this[0])
		line = $("<tr><td></td><td></td></tr>")
		line.children("td:first").text(animal.name)
		line.children("td:nth-child(2)").text(this[1].toString())
		$("#animals>tbody>tr:last").append(line)
	})
}


$(function(){
	questions = get_questions();
	function step(){
		try{
			oneQuestion()
		}catch(e){
			step()
		}
	}
	step()
})
	