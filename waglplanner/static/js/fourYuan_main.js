

var x = "0.0";
var y = "0.0";
var z = "0.0";

var f_x = "null";
var f_y = "null";
var f_z = "null";
var f_w = "null";



function getCookie(key){
	
	var cookies = document.cookie.split(";");
	for(var i = 0 ; i < cookies.length ; i ++){
		
		var item = cookies[i];
		if(item[0] === key){
			return item[1];
		}
	}
	return "0.0";
}

function addCookie(key,value){
	
	var st = key + "=" + value + ";" ;
	document.cookie = st;
	console.log(document.cookie);
}

function saveInput(){
	
	x = $("#X").val();
	y = $("#Y").val();
	z = $("#Z").val();
	addCookie("X",x);
	addCookie("Y",y);
	addCookie("Z",z);
}

function loadInput(){
	
	x = getCookie("X");
	y = getCookie("Y");
	z = getCookie("Z");
	
	$("#X").val(x);
	$("#Y").val(y);
	$("#Z").val(z);
	
}

$(document).ready(function(){
	
	
	$("#input_submit").click(function(){
		saveInput();	
	});
	
	setInterval(saveInput,1000);
	
	
});