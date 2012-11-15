
var questions = JSON.parse(JSON.stringify(questions_statistic))	//тут храним оставшиеся
var questions_probabilities = {}
var answered_questions = []
var showed_animals = []
var answers = []	//тут храним ответы на отправку
var animals = JSON.parse(JSON.stringify(animals_statistic))	
var question 	//Тут храним рекущий вопрос
var answer		//Тут храним id текущего ответа


function getBestQuestion(){
	var min=1
	var k = 0
	for(key in questions_probabilities){
		var element = questions_probabilities[key]
		if(element<=min && answered_questions.indexOf(key) == -1){
			min = element
			k = key
		}
	}
	
	answered_questions.push(k)
	
	return k
}

function getBestAnimal(){
	var max = -1
	var id = -1
	for(key in p_c){
		if(p_c[key]>=max && showed_animals.indexOf(key) == -1){
			max = p_c[key]
			id = key
		}
	}
	
	showed_animals.push(id)
	
	return id
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

$(function(){RefreshQuestionProbabilities(); showBestQuestions()})
	