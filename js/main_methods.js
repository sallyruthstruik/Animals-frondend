

function get_animals(){
	x = $.ajax({
		async: false,
		url: "/ajax/animals"})
	return $.parseJSON(x.responseText)
}

function get_questions(){
	x = $.ajax({
		async: false,
		url: "/ajax/questions"})
	return $.parseJSON(x.responseText)
}