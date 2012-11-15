



function showAnimals(){
	var animals = get_animals()
	
	function printQuestionsAnswers(qa){
		var s = ''
		if(qa.length == 0){
			return "NULL"
		}
		$(qa).each(
				function(n){
					s+="<br>"+this.question.question+"      "+this.answer.answer
				}
		)
		return s
	}
	
	$(animals).each(
			function(n){
				if(n==0){
					$("table").html(
							"<tr><td>"+this.name+"</td><td>"+this.statistic_count+"</td><td>"+printQuestionsAnswers(this.qa)+"</td></tr>"
					)
				}else{
					$("table>tbody").append("<tr><td>"+this.name+"</td><td>"+this.statistic_count+"</td><td>"+printQuestionsAnswers(this.qa)+"</td></tr>")
				}
			}
		)
}


$(function(){showAnimals()})
