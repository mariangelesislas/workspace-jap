// funcion que accede al id username, para luego guardarlo como una variable llamada name
//https://stackoverflow.com/questions/35329180/localstorage-save-name-through-form-show-on-other-page con mi grupo nos basamos en este ejercicio
//para poder hacer la tarea de Veterinaria Friends. Yo use este ejemplo tambien para esta tarea.

function saveUsername(){
    var name = document.getElementById('username').value;
     localStorage.setItem('username', name);
};

// funcion que si los campos se encuentran vacios envia un cartel diciendo que se deben completar todos. En caso de que no este vacios,
// guarda el nombre de usuario y redirecciona a products
function validarCamposVacios(){

    let usuario = document.getElementById("username").value;
    let contrasena = document.getElementById("password").value;
    // si los campos no estan vacios se redirecciona al archivo home
    if((usuario !=="")&& (contrasena !=="")){
        saveUsername()
        document.location.href="products.html";
        
    }else
    {
        alert("Error, debe completar todos los campos.");  
    }
}


