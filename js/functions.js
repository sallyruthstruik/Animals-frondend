

/*
 * функция,
 * возвращает данные COOKIE
*/
function getCookie( name ) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if ( cookie.length > 0 ) {
		offset = cookie.indexOf( search );
		if ( offset != -1 ) {
			offset += search.length;
			end = cookie.indexOf( ";", offset )
			if (end == -1) end = cookie.length;
			setStr = unescape( cookie.substring( offset, end ) );
		}
	}
	return( setStr );
}
/*
 * функция,
 * возвращает данные GET
*/
function $_get() { 
   var $_GET = {}; 
   var __GET = window.location.search.substring(1).split( "&" ); 
   for( var i = 0; i < __GET.length; i++ ) { 
      var getVar = __GET[i].split( "=" ); 
      $_GET[ getVar[ 0 ] ] = typeof( getVar[ 1 ] ) == "undefined" ? "" : getVar[ 1 ]; 
   } 
   return $_GET; 
}

function animateCharacter( mode ) {
	switch ( mode ) {
		case 1: // yawn
			$( "#div_characterBeakDown" ).animate( { top: "+=10"}, control.duration, function() {
				$( this ).animate( { top: "-=10"}, control.duration );
			} );
			break;
		case 2: // blink
			$( "#div_characterEye" ).animate( { height: "-=20"}, control.duration, function() {
				$( this ).animate( { height: "+=20"}, control.duration );
			} );
			break;
		case 3: // sigh
			$( "#div_characterBody" ).animate( { borderBottomRightRadius: "-=30"}, control.duration*2, function() {
				$( this ).animate( { borderBottomRightRadius: "+=30"}, control.duration*2 );
			} );
			break;
	}
}

function randAnimateCharacter(){
	animateCharacter( Math.round( Math.random()*2 ) + 1 );
}

function showQuestion( id ) {
	current = undefined;
	for( var i = 0; i < questions.length; i++ ) {
		if( questions[ i ].question_id == id ) {
			current = questions[ i ];
		}
	}
	if ( current != undefined ) {

		text = current.question;

		options = "";

		for ( var i = 0; i < current.answers.length; i++ ) {
			options += button( "", "questionOption", "id=" + current.answers[ i ].answer_id, current.answers[ i ].answer );
		}

		inn = 
		div( "", "question", "id=" + id,
			div( "", "questionLeft", "",
				div( "", "questionText", "", text )+
				div( "", "questionOptions", "", options )+
				sp()
			)+
			div( "", "questionRight", "",
				div( "", "questionArrow", "", "" )
			)+
			sp()
		);

		$( "#div_questions" ).append( inn );

		$( ".button_questionOption_class" ).unbind("click").bind( "click", function() {
			console.log( "Click question id#"+$( this ).parent().parent().parent().attr( "id" )+", answer id#"+$( this ).attr( "id" ) );
			
			var answer_id = $( this ).attr( "id" );
			var question_id = $( this ).parent().parent().parent().attr( "id" );
			var label = true

			hideQuestion(question_id)
			answers.push([question_id, answer_id])
			showQuestion(getBestQuestion())
			RefreshQuestionProbabilities(question_id, answer_id)
			showBestQuestions()
			
			hideAnimal("all")
			for(var i=0; i<3; i++){
				showAnimal(getBestAnimal())
			}
			
			showed_animals = []
			
		} );

		$( ".div_questionArrow_class" ).each( function() {
			$( this ).css( "margin-top", ( $( this ).parent().prev().height() )/2 - 20 );
		} );

		console.log( "Get question by id #"+id );

	} else {
		console.log( "Can't get question by id #"+id );
	}
}


function hideQuestion( id ) {
	if ( id == "all" ) {
		$( ".div_question_class" ).remove();
		console.log( "Remove all questions" );
	} else {
		if( $( ".div_question_class[id=" + id + "]" ).length > 0 ) {
			$( ".div_question_class[id=" + id + "]" )
				.children().animate( {opacity: 0}, control.duration*3, function() {
					$( ".div_question_class[id=" + id + "]" ).slideUp( control.duration*3, function() {
						$( this ).delay( control.duration*3 ).remove();
					} );
				} );
			console.log( "Remove question id #"+id );
		} else {
			console.log( "Can't remove question id #"+id );
		}
	}
}

function showAnimal( id ) {
	current = undefined;
	for( var i = 0; i < animals.length; i++ ) {
		if( animals[ i ].id == id ) {
			current = animals[ i ];
		}
	}
	if ( current != undefined ) {

		text = current.name;

		inn = 
		div( "", "answer", "id=" + id,
			div( "", "answerLeft", "",
				div( "", "answerArrow", "", "" )
			)+
			div( "", "answerRight", "",
				div( "", "answerText", "", text )
			)+
			sp()
		);

		$( "#div_answers" ).append( inn );

		$( ".div_answer_class" ).unbind("click").bind( "click", function() {
			var newAnimal = $( this ).children( ".div_answerRight_class" ).children( ".div_answerText_class" ).html();
			sendAnimalStatistics(newAnimal)
			alert("Спасибо за игру!")
			window.setTimeout('window.location = "/"', 1000)
			} );

		$( ".div_answerArrow_class" ).each( function() {
			$( this ).css( "margin-top", ( $( this ).parent().next().height() )/2 - 20 );
		} );

		console.log( "Get animal by id #"+id );

	} else {
		console.log( "Can't get animal by id #"+id );
	}
}


function hideAnimal( id ) {
	if ( id == "all" ) {
		$( ".div_answer_class" ).animate( {opacity: 0}, control.duration*3, function() {
			$( this ).slideUp( control.duration*3, function() {
				$( this ).delay( control.duration*3 ).remove();
			} );
		} );
		console.log( "Remove all animals" );
	} else {
		if( $( ".div_answer_class[id=" + id + "]" ).length > 0 ) {
			$( ".div_answer_class[id=" + id + "]" )
				.children().animate( {opacity: 0}, control.duration*3, function() {
					$( ".div_answer_class[id=" + id + "]" ).slideUp( control.duration*3, function() {
						$( this ).delay( control.duration*3 ).remove();
					} );
				} );
			console.log( "Remove animal id #"+id );
		} else {
			console.log( "Can't remove animal id #"+id );
		}
	}showed_animals
}
// function showQuestion( id ) {
// 	some = questions.get( id );
// 	text = some.text;
// 	options = "";
// 	for ( var i = 0; i < some.options.length; i++ ) {
// 		options += button( "", "questionOption", "", some.options[ i ] );
// 	}
// 	inn = 
// 	div( "", "question", "id=" + id,
// 		div( "", "questionLeft", "",
// 			div( "", "questionText", "", text )+
// 			div( "", "questionOptions", "", options )+
// 			sp()
// 		)+
// 		div( "", "questionRight", "",
// 			div( "", "questionArrow", "", "" )
// 		)+
// 		sp()
// 	);
// 	$( "#div_questions" ).append( inn );
// 	$( ".div_questionArrow_class" ).each( function() {
// 		$( this ).css( "margin-top", ( $( this ).parent().prev().height() )/2 - 20 );
// 	} );
// }

// function hideQuestion( id ) {
// 	$( ".div_question_class[id=" + id + "]" ).remove();
// }

// function showAnswer( id ) {
// 	some = answers.get( id );
// 	text = some.text;
// 	options = "";
// 	for ( var i = 0; i < some.options.length; i++ ) {
// 		options += button( "", "answerOption", "", some.options[ i ] );
// 	}
// 	inn = 
// 	div( "", "answer", "id=" + id,
// 		div( "", "answerLeft", "",
// 			div( "", "answerArrow", "", "" )
// 		)+
// 		div( "", "answerRight", "",
// 			div( "", "answerText", "", text )+
// 			div( "", "answerOptions", "", options )+
// 			sp()
// 		)+
// 		sp()
// 	);
// 	$( "#div_answers" ).append( inn );
// 	$( ".div_answerArrow_class" ).each( function() {
// 		$( this ).css( "margin-top", ( $( this ).parent().next().height() )/2 - 20 );
// 	} );
// }

// function hideAnswer( id ) {
// 	$( ".div_answer_class[id=" + id + "]" ).remove();
// }