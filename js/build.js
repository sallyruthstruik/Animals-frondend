function build( mode ){
	build_body( mode );

}

function build_body( mode ) {
	inn = 
	div( "main", "", "", "" )+
	div( "surrenderCurtain", "curtain", "" , "" )+
	div( "surrender", "popWindow", "",
		input( "surrender", "popWindow", "", "" )+"<br>"+
		button( "surrender", "popWindow", "", "Назвать" )
	);
	/*********************************/
	$( "body" ).html( inn );
		// .css( "margin", "0" )
		// .css( "padding", "0");
	/*********************************/
	$( "#button_surrender" ).bind( "click", function() {
		var animal = $( "#input_surrender" ).val();
		sendAnimalStatistics(animal)
		alert("Спасибо за игру")
		window.setTimeout('window.location = "/"', 1000)
	} );
	$( "#div_surrenderCurtain" ).bind( "click", function() {
		$( "#div_surrender" ).css( "display", "none" );
		$( this ).css( "display", "none" );
	} );
	/*******************************/
	build_main( mode );
	/*******************************/
	$( "#div_surrender" )
		.css( "top", $( "#button_surrender" ).position().bottom + 20 )
		.css( "left", $( "#button_surrender" ).position().left + 20 );
}

function build_main( mode ) {
	inn = 
	div( "header", "", "", "" )+
	div( "content", "", "", "" )+
	div( "footer", "", "", "" );
	/*********************************/
	$( "#div_main" ).html( inn );
	/*********************************/
	build_header( mode);
	build_content( mode );
	build_footer( mode );
}

function build_header( mode ) {
	inn =
	div( "mainMenu", "", "", "" );
	/*********************************/
	$( "#div_header" ).html( inn );
	/*********************************/
	build_mainMenu( mode );
}

function build_mainMenu( mode ) {
	inn =
	div( "mainMenuLeft", "", "", "" )+
	div( "mainMenuRight", "", "", "" )+
	sp();
	/*******************************/
	$( "#div_mainMenu" ).html( inn );
	/******************************/
	build_mainMenuLeft( mode );
	build_mainMenuRight( mode );
}

function build_mainMenuLeft( mode ) {
	inn =
	button( "mainMenuAgain", "mainMenuLeft", "", "Заново" );
	/******************************/
	$( "#div_mainMenuLeft" ).html( inn );
	/******************************/
	$( "#button_mainMenuAgain" ).bind( "click", function() {
		window.location.reload();
	} );
}

function build_mainMenuRight( mode ){
	inn = 
	button( "mainMenuSurrender", "mainMenuRight", "", "Назвать животное" );
	/*************************/
	$( "#div_mainMenuRight" ).html( inn );
	/************************/
	$( "#button_mainMenuSurrender" ).bind( "click", function() {
		$( "#div_surrenderCurtain" ).css( "display", "block" );
		$( "#div_surrender" ).css( "display", "block" );
	} );
}

function build_content( mode ) {
	inn = 
	div( "questions", "", "", "" )+
	div( "character", "", "", "" )+
	div( "answers", "", "", "" )+
	sp();
	/*********************************/
	$( "#div_content" ).html( inn );
	/*********************************/
	build_character( mode );
}

function build_character( mode ) {
	inn = 
	div( "characterEye", "", "", "" )+
	div( "characterBody", "", "", "" )+
	div( "characterWing", "", "", "" )+
	div( "characterBeakUp", "", "", "" )+
	div( "characterBeakDown", "", "", "" )+
	"1"
	/*********************************/
	$( "#div_character" ).html( inn );

	setInterval( randAnimateCharacter, control.interval );

	$( "#div_characterEye" )
		.css( "width", (control.characterSize/250)*27 )
		.css( "height", (control.characterSize/250)*27 )
		.css( "top", (control.characterSize/250)*50 )
		.css( "margin-left", (control.characterSize/250)*160 )
		.css( "border-width", (control.characterSize/250)*13.6 )
		.css( "-moz-border-radius", (control.characterSize/250)*30 )
		.css( "-webkit-border-radius", (control.characterSize/250)*30 )
		.css( "-o-border-radius", (control.characterSize/250)*30 )
		.css( "-ms-border-radius", (control.characterSize/250)*30 )
		.css( "-khtml-border-radius", (control.characterSize/250)*30 )
		.css( "border-radius", (control.characterSize/250)*30 );

	$( "#div_characterBody" )
		.css( "width", control.characterSize )
		.css( "height", control.characterSize )
		.css( "top", 0 )
		.css( "margin-left", 0 )
		.css( "-moz-border-radius", (control.characterSize/250)*121+"px"+" 0px" )
		.css( "-webkit-border-radius", (control.characterSize/250)*121+"px"+" 0px" )
		.css( "-o-border-radius", (control.characterSize/250)*121+"px"+" 0px" )
		.css( "-ms-border-radius", (control.characterSize/250)*121+"px"+" 0px" )
		.css( "-khtml-border-radius", (control.characterSize/250)*121+"px"+" 0px" )
		.css( "border-radius", (control.characterSize/250)*121+"px"+" 0px" );

	$( "#div_characterWing" )
		.css( "width", (control.characterSize/250)*125 )
		.css( "height", (control.characterSize/250)*125 )
		.css( "top", (control.characterSize/250)*124 )
		.css( "margin-left", 0 )
		.css( "-moz-border-radius", (control.characterSize/250)*60.6+"px"+" 0px" )
		.css( "-webkit-border-radius", (control.characterSize/250)*60.6+"px"+" 0px" )
		.css( "-o-border-radius", (control.characterSize/250)*60.6+"px"+" 0px" )
		.css( "-ms-border-radius", (control.characterSize/250)*60.6+"px"+" 0px" )
		.css( "-khtml-border-radius", (control.characterSize/250)*60.6+"px"+" 0px" )
		.css( "border-radius", (control.characterSize/250)*60.6+"px"+" 0px" );

	$( "#div_characterBeakUp" )
		.css( "width", (control.characterSize/250)*60.6 )
		.css( "height", (control.characterSize/250)*60.6 )
		.css( "top", 0 )
		.css( "margin-left", control.characterSize )
		.css( "-moz-border-radius-topright", (control.characterSize/250)*57.6 )
		.css( "-webkit-border-top-right-radius", (control.characterSize/250)*57.6 )
		.css( "-o-border-top-right-radius", (control.characterSize/250)*57.6 )
		.css( "-ms-border-top-right-radius", (control.characterSize/250)*57.6 )
		.css( "-khtml-border-top-right-radius", (control.characterSize/250)*57.6 )
		.css( "border-top-right-radius", (control.characterSize/250)*57.6 );

	$( "#div_characterBeakDown" )
		.css( "width", (control.characterSize/250)*30.3 )
		.css( "height", (control.characterSize/250)*30.3 )
		.css( "top", (control.characterSize/250)*60.6 )
		.css( "margin-left", control.characterSize )
		.css( "-moz-border-radius-bottomright", (control.characterSize/250)*27.3 )
		.css( "-webkit-border-bottom-right-radius", (control.characterSize/250)*27.3 )
		.css( "-o-border-bottom-right-radius", (control.characterSize/250)*27.3 )
		.css( "-ms-border-bottom-right-radius", (control.characterSize/250)*27.3 )
		.css( "-khtml-border-bottom-right-radius", (control.characterSize/250)*27.3 )
		.css( "border-bottom-right-radius", (control.characterSize/250)*27.3 );
}

function build_footer( mode ) {
	inn = "";
	/*********************************/
	$( "#div_footer" ).html( inn );
	/*********************************/
}

// function build_questions( mode ) {
// 	inn = 
// 	div( "questions", "", "", "questions" );
// 	/*********************************/
// 	$( "#div_main" ).html( inn );
// 	/*********************************/
// 	$( "#div_questions")
// 		.css( "margin", "0 auto" )
// 		.css( "width", control.width );
// }

// function build_answers( mode ) {
// 	inn = 
// 	div( "answers", "", "", "answers" );
// 	/*********************************/
// 	$( "#div_main" ).html( inn );
// 	/*********************************/
// 	$( "#div_answers")
// 		.css( "margin", "0 auto" )
// 		.css( "width", control.width );
// }
