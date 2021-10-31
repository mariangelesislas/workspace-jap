// obtiene el valor que se ingreso en los campos
function getAndSaveUserProfile(){
let getUserSignUpForm={
    nombre:document.getElementById("name").value,
    primerApellido:document.getElementById("firstsurname").value,
    segundoApellido:document.getElementById("secondsurname").value,
    edad:document.getElementById("userage").value,
    celular:document.getElementById("cellphone").value,
    sobrenombre:document.getElementById("nickname").value,
    cumpleaños:document.getElementById("birthday").value,
    gitHubLink:document.getElementById("usergithub").value

    }
// permite guardar la informacion de manera correcta asi se puede recuperar
localStorage.setItem("userprofile",JSON.stringify(getUserSignUpForm));
}


// permite ver con detalles lo que se encuentra dentro del objeto
//let userProfileAttributeValue= JSON.parse(localStorage.getItem("userprofile"));
//console.log(userProfileAttributeValue.name);
