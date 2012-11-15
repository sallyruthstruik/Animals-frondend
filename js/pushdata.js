
var questions = []
var animals = []

function getQuestion(){
	var question =  $("input[id=question]:first")[0].value
	var answers = []
	var $_answers = $("div[id=question]>div[id=answer]>input")
	for(var key=0; key< $_answers.length; key++){
		answers.push($_answers[key].value)
	}
	questions.push({
		question: question,
		answers: answers
	})
	
	$("#count").text(questions.length.toString())
}

function addQuestion(){
	getQuestion()
	$("div[id=question]").html(
			'<hr>\
			Введите вопрос: <input type="text" id="question">\
			<div id="answer">Введите ответ:  <input type="text" id = "answer"></div>\
			<br>Добавить ответ:  <input type="button" value="+" id="addans" onclick = "addAnswer()">\
			<br><br>\
			<hr>\
			Добавить вопрос:  <input type="button" value="+" id="addquest" onclick="addQuestion()">'
	)
}

function addAnswer(){
	$("div[id=answer]:last").after(function(){return '<div id="answer">Введите ответ:  <input type="text" id = "answer"></div>'})
}

function addAnimal(){
	$("div[id=animal]").append('Введите животное:  <input type="text" id = "animal"><br>')
}

function getAnimals(){
	$("div[id=animal]>input").each(function(n){
		animals.push(this.value)
	})
}

function sendData(){
	getQuestion()
	getAnimals()
	var questionJSON = JSON.stringify(questions)
	var animalsJSON = JSON.stringify(animals)
	$.post("/ajax/pushdata",
			{
		questions : questionJSON,
		animals : animalsJSON
			},
			function(data){
				if(data.response == "ok"){
					$("body").html("Данные сохранены.<br><a href='/'>На главную</a>")
					//window.location = "/"
				}
				else{
					$("body").html(data)
				}
			})
}






