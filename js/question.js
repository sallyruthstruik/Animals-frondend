
var question
var animals
var animal
var current_answer
var answers = []
var choosed_answer
var animals_answers = {}



function addAnimalAnswer(){
	if(current_answer != undefined){
		animals_answers[animal.id] = current_answer.toLowerCase()
	}
}

function sendAnimalAnswersOnServer(){
	var data = animals_answers
	data["question"] = question.toLowerCase()
	$.post(
		"/ajax/send_animals_answers",
		animals_answers,
		function(data){
			$("#senddata").hide()
			if(data.response == "added"){
				$("div[id=answers]").html("Вопрос добавлен. Вы будете перенаправлены на главную.")
				window.setTimeout(function(){window.location="/"}, 3000)
			}else{
				$("div[id=answers]").html("Error: "+data.response)
				window.setTimeout(function(){window.location="/"}, 3000)
			}
		}
	)
}

function setCurrentAnswer(ans){
	alert(ans)
	current_answer=ans;
	GameStep()
}

function add_answer(){
	var value = $('input[id=your_answer]')[0].value
	current_answer = value
	if(answers.indexOf(value)==-1 && value!=''){
		answers.push($('input[id=your_answer]')[0].value)
	}
}


function GameStep(){
	$("#senddata").show()
	if(animals.length == 0){
		sendAnimalAnswersOnServer()
	}
	animal = animals[0]
	
	
	
	$("div[id=answers]>ul").html('<li>Ваш ответ:  <input type="text" id="your_answer">    '+"<input type='submit' id='send_your_answer' onclick='(function(){add_answer(); addAnimalAnswer(); GameStep();})()'>"+'</li>')
	
	$("div[id=question]").html('Ответьте на вопрос "'+question+'" для животного "'+animal.name+'":')
	$(answers).each(
		function(n){
			var new_button = $('<li><input type="button" name="answer"></li>')
			
			new_button.children("input").prop("value", this).bind("click", this, function(e){setCurrentAnswer(e.data)})
			$("div[id=answers]>ul>li:last").append(new_button)
			
		}	
	)
	
	addAnimalAnswer()
	
	
	animals.splice(0,1)
	
}



function startGame(){
	question = $("input[id=question]")[0].value
	$.post(
			"/ajax/checkquest",
			{
				question:question.toLowerCase()
			},
			function(data){
				if(data.response=="already exists"){
					$("body").html("Вопрос уже существует. Вы будете перенаправлены на главную.")
					window.setTimeout(function(){window.location="/"}, 3000)
				}
				else if(data.response == "ok"){
					animals = get_animals()
					GameStep()
					
					
				}else{
					$("body").html("Сервер не отвечает. Вы будете перенаправлены на главную.")
					window.setTimeout(function(){window.location="/"}, 3000)
				}
			}
	)
	
}
