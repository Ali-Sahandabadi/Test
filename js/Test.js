function clickButton(){

var text ="",
    name = [],
    p = [],
    request = new XMLHttpRequest();
//this object lets us make asynchronous calls to the server 
request.open('GET', 'http://awebserver.ch/party/234234/participants');
//the HTTP GET method to send the data over to our live web server
request.onreadystatechange = function(){

  if((request.status==200) && ( request.readyState==4)){

    //code  200 represents a successful transaction, code 4 -> The request has been processed and the response is ready
    var myObj = JSON.parse(request.responseText);
    // convert JSON format to JS array format

  for (var i = 0; i < myObj[0].participants.length; i++){
    // number of participants
    p[i] = myObj[0].participants[i].name_surname;
    name[i] = myObj[0].participants[i].name_surname.split(" ", 1);
    // Just keep name and remove family name
    if (checkGender(name[i]) == true){
      // this function predicts gender of name
       text += p[i] + "<br>";
       // Making a list of female names with family name
    };

    
     document.getElementById("female").innerHTML= text;
     // Showing list by <p> tag which defined already in index.html 
  }
  }
}

request.send();
// sending the request over to the server
}

function checkGender (c){
     var request2 = new XMLHttpRequest();


     request2.open('GET', 'https://api.genderize.io/?name='+c);
     // c is as parameter to check each gender of each name
     //this API gives us a JSON format like : {"name":"ali","gender":"male","probability":0.85,"count":3351}  
     request2.onreadystatechange = function(){
       if((request2.status==200) && ( request2.readyState==4)){

      var myObjName = JSON.parse(request2.responseText);
    
      if (myObjName.gender == "female"){

        //if gender is female, it will return us a true value
          return true;
       }
       else {
       //if gender is male or unrecognized, it will return us a false value

        return false;
       }
      }
    }
        request2.send();
       
}
