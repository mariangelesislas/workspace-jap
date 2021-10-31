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
    gitHubLink:document.getElementById("usergithub").value,
    correo:document.getElementById("email").value
   

    }
    // permite guardar la informacion de manera correcta asi se puede recuperar
    localStorage.setItem("userprofile",JSON.stringify(getUserSignUpForm));

}

//permite mostrar en pantalla los valores obtenidos anteriormente en su input correspondiente
function showInputValue(){
    
    let userProfileAttributeValue= JSON.parse(localStorage.getItem("userprofile"));
    document.getElementById("name").value = userProfileAttributeValue.nombre;
    document.getElementById("firstsurname").value = userProfileAttributeValue.primerApellido;
    document.getElementById("secondsurname").value = userProfileAttributeValue.segundoApellido;
    document.getElementById("userage").value = userProfileAttributeValue.edad;
    document.getElementById("cellphone").value = userProfileAttributeValue.celular;
    document.getElementById("nickname").value = userProfileAttributeValue.sobrenombre;
    document.getElementById("birthday").value = userProfileAttributeValue.cumpleaños;
    document.getElementById("usergithub").value = userProfileAttributeValue.gitHubLink;
    document.getElementById("email").value = userProfileAttributeValue.correo;
    //permite ven en la consola lo que se agrego  ( NO TIENE POR QUE SER NECESARIO PERO YO LO DEJO POR LAS DUDAS)
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
