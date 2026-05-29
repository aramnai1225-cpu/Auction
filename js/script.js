//here function to validate the form field
function validateForm(){
    var name= document.getElementById("name").value;
    var email= document.getElementById("email").value;
    var message= document.getElementById("message").value;
    var phone= document.getElementById("phone").value;
    //check if it is empty
    
    //we will check name contains numbers
    var namepattern = /^[A-Za-z\s]+$/; // won't allowed any number on the name
if (!namepattern.test(name)){
    alert("name must contain only letters");
    return false; //this will prevent form fro
}
    if (name =="") {
    alert ("Please enter your name");
    return false; //if name is empty it won't be allow
}

//check the email
    var emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regular expression
    if (email =="") {
    alert ("Please enter your email ");
    return false;
}
    if (!emailpattern.test(email)) {
        alert("Invalid email");
        return false;
    }
 
     //check phone
    var phonepattern  = /^\d{9,10}$/; //regular expression

if (phone =="") {
    alert ("Please enter your phone");
    return false;
}
if (!phonepattern.test(phone)) {
    alert ("must 9-10 numbers");
    return false;
}


//message check

if (message =="") {
    alert ("Please enter your message")
    return false;
}
//If entered it shows successfully
document.getElementById("error").innerText = "Form submitted successfully!";
return true; //if it not false not allowed to submitted
}
//fake payment successfuuly massage
function fakePayment(){
    document.getElementById("message").innerText = "Payment successfully! You are registred.";
}


// filter in information 
function filterItems(){
  var input = document.getElementById("search").value.toUpperCase();
  var cards =  document.getElementsByClassName("list");
  for (var i = 0; i < cards.length; i++) {
    var text = cards[i].innerText;
    if (text.toUpperCase().indexOf(input) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
     }
   }
}

//Register page 
function validateRegister(){

    var name =
    document.getElementById("name").value;

    var email =
    document.getElementById("email").value;

    var phone =
    document.getElementById("phone").value;

    var password =
    document.getElementById("password").value;

    var type =
    document.getElementById("type").value;

    if(name == "" ||
       email == "" ||
       phone == "" ||
       password == "" ||
       type == ""){

        alert("Please fill all fields");
        return false;
    }

    var user = {

        name:name,
        email:email,
        phone:phone,
        password:password,
        type:type
    };

    let users =
    JSON.parse(
    localStorage.getItem("users")
    ) || [];

    users.push(user);

    localStorage.setItem(
    "users",
    JSON.stringify(users)
    );

    alert("Registration successful!");

    window.location.href =
    "login.html";

    return false;
}

//login 
function loginUser(){

    let email =
    document.getElementById(
    "loginEmail"
    ).value;

    let password =
    document.getElementById(
    "loginPassword"
    ).value;

    let users =
    JSON.parse(
    localStorage.getItem("users")
    ) || [];

    for(let i=0; i<users.length; i++){

        if(users[i].email == email &&
           users[i].password == password){

            localStorage.setItem(
            "loggedUser",
            JSON.stringify(users[i])
            );

            alert("Login successful!");

            window.location.href =
            "dashboard.html";

            return false;
        }
    }

    alert("Invalid email or password");

    return false;
}
  
localStorage.setItem("name","Bat");
function addToCart(name, price){

    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];

    let item = {

        name:name,
        price:price
    };

    cart.push(item);

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

    alert("Added to cart");
}
let currentBid = 7500;

let timeLeft = 30;

function increaseBid(){

    currentBid += 100;

    document.getElementById(
    "bidPrice"
    ).innerHTML = currentBid;

    timeLeft = 30;
}

setInterval(function(){

    timeLeft--;

    document.getElementById(
    "timer"
    ).innerHTML = timeLeft;

    if(timeLeft <= 0){

        alert(
        "Auction ended!\nSold for €"
        + currentBid
        );

        timeLeft = 30;
    }

},1000);