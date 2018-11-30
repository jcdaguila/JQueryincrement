//Allow only letters, numbers and "."
$(document).ready(function(){
    $("#cadena").on('change keyup paste',function(e){
    //$(this).val($(this).val().replace(/[.][^A-Za-z0-9]/g,''));
    $(this).val($(this).val().replace(/[.]{2}/g,'.'));    
    $(this).val($(this).val().replace(/^\.|[^a-zA-Z0-9.]+$/g,''));

    $(this).val($(this).val().toLowerCase());
     })
});
//Clear a "." character at the end of the string.
$(document).ready(function(){
    $("#cadena").on('blur',function(e){
    $(this).val($(this).val().replace(/\.$/g,''));
     })
});

//Not empty Index
$(document).ready(function(){
    $("#indice").on('change keyup paste',function(e){
    $(this).val($(this).val().replace(/^ *$/g,'-1'));
     })
});

//Increase Functions
function resolv()
{
	var cadena = document.getElementById('cadena').value;
	if(!(typeof cadena === "string" && cadena.length > 0))
	{
		alert("Empty Version String is not Allowed.");
	}else{
		var index = parseInt(document.getElementById('indice').value);
		var rpta = increment(cadena, index);
		if(rpta != ""){
			document.getElementById('original').value = document.getElementById('cadena').value;
			document.getElementById('cadena').value = rpta; 
		}
	}
}

function increment(cad, index = -1)
{
	var mat = cad.split('.'); //convert string to array splited by "."
	var result;
	var indexAux;
	
	if(index > mat.length-1 || index < -1){
		alert("Your index must to be >= -1 and <= than the number of elements.");
		return "";
	} 		

	if (index == -1){
		indexAux = mat.length-1;
	}
	else{
		indexAux = index;
		var i;
		for(i = indexAux + 1; i <= mat.length-1; i++){
			mat[i] = "0";
		}
	}
	var cadval = mat[indexAux];
	result = validation(cadval);
	mat[indexAux] = result;

	var final = mat.join('.');
	
	return final;
}

//If cadval is a number increase it for 1
function validation(cadval){
	var result;
		if(isNaN(cadval)) //Item is a number?
		{
			result = validationSec(cadval); 
		}else
		{
			result = parseInt(cadval, 10) + 1;
		}
	return result;
}

//if cadvas is a string last character will be evaluated
function validationSec(cadval){
	var result;
	var cadAux = cadval.split(""); //convert string into array by ""
	var lastone = cadAux[cadAux.length-1];
		if(isNaN(lastone)) //Item is not a number?
		{
			var av = lastone.charCodeAt(0); //Getting Ascii Code
			if(av >= 97 && av <= 122){ //ascii code for a-z lower case letters
				if(av == 122){
					result = 'aa';
				}else{
					result = String.fromCharCode(av + 1);
				}
			}
		}else
		{
			result = parseInt(lastone, 10) + 1;
		}
	cadAux[cadAux.length-1] = result;
	return cadAux.join("");
}