/*
 * класс,
 * содержит основные данные страницы
*/
control = {
	characterSize: 250,
	duration: 100,
	interval: 2000
}
/*
 * конструктор класcа вопроса
*/
// function question( text, options ) {
// 	this.text = text;
// 	this.options = options;
// }
// /*
//  * конструктор класcа ответа
// */
// function answer( text, options ) {
// 	this.text = text;
// 	this.options = options;
// }
// /*
//  * класс,
//  * содержит все вопросы
//  * и методы работы с ними
// */
// questions = {
// 	counter: 1,
// 	queue: new Object(),
// 	push: function( q ) {
// 		questions.queue[ questions.counter ] = q;
// 		questions.counter++;
// 	},
// 	get: function( id ) {
// 		for ( identifier in questions.queue ) {
// 			if ( identifier == id ) {
// 				return questions.queue[ identifier ];
// 			}
// 		}
// 	}
// }
// /*
//  * класс,
//  * содержит все ответы
//  * и методы работы с ними
// */
// answers = {
// 	counter: 1,
// 	queue: new Object(),
// 	push: function( a ) {
// 		answers.queue[ answers.counter ] = a;
// 		answers.counter++;
// 	},
// 	get: function( id ) {
// 		for ( identifier in answers.queue ) {
// 			if ( identifier == id ) {
// 				return answers.queue[ identifier ];
// 			}
// 		}
// 	}
// }