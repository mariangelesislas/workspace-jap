// obtiene el valor que se ingreso en los campos
let getUserSignUpForm;

function getAndSaveUserProfile(){
let getUserSignUpForm={
    nombre:document.getElementById("name").value,
    primerApellido:document.getElementById("firstsurname").value,
    segundoApellido:document.getElementById("secondsurname").value,
    edad:document.getElementById("userage").value,
    celular:document.getElementById("cellphone").value,
    sobrenombre:document.getElementById("nickname").value,
    cumpleaños:document.getElementById("birthday").value,
    gitHubLink:document.getElementById("usergithub").value,
    correo:document.getElementById("email").value
   

    }
    // permite guardar la informacion de manera correcta asi se puede recuperar
    localStorage.setItem("userprofile",JSON.stringify(getUserSignUpForm));

}

//permite mostrar en pantalla los valores obtenidos anteriormente en su input correspondiente
function showInputValue(){
    
    let userProfileAttributeValue= JSON.parse(localStorage.getItem("userprofile"));
    console.log(userProfileAttributeValue.nombre);
    console.log(userProfileAttributeValue.primerApellido);
    console.log(userProfileAttributeValue.segundoApellido);
    console.log(userProfileAttributeValue.edad);
    console.log(userProfileAttributeValue.celular);
    console.log(userProfileAttributeValue.sobrenombre);
    console.log(userProfileAttributeValue.cumpleaños);
    console.log(userProfileAttributeValue.gitHubLink);
    console.log(userProfileAttributeValue.correo);
    }


// una vez ingresada a la pagina se mostrara lo guardado anteriormente
document.addEventListener("DOMContentLoaded",function(e){
    showInputValue();

})
