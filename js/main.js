// questions.push( new question(  "Оно покрыто шерстью?", [ "Да", "Нет" ] ) );
// questions.push( new question(  "У него есть зубы?", [ "Да", "Пожалуй", "Точно нет" ] ) );
// questions.push( new question(  "Это животное плетет паутину?", [ "Да, точно", "Не совсем" ] ) );

// answers.push( new answer(  "Жираф", [ "Точно!", "Как вариант", "Нет" ] ) );
// answers.push( new answer(  "Пингвин", [ "Да", "Нет" ] ) );
// answers.push( new answer(  "Пчела", [ "Бинго", "Возможно", "Точно нет"] ) );

build();

RefreshQuestionProbabilities()

for(var i=0; i<3; i++){
	showQuestion(getBestQuestion())
}

for(var i=0; i<3; i++){
	showAnimal(getBestAnimal())
}

showed_animals = []


// showQuestion( 2 );
// showQuestion( 1 );

// showAnswer( 1 );
// showAnswer( 2 );
// showAnswer( 3 );