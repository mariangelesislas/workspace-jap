function validarCamposVacios(){

    let usuario = document.getElementById("username").value;
    let contrasena = document.getElementById("password").value;
    // si los campos no estan vacios se redirecciona al archivo home
    if((usuario !=="")&& (contrasena !=="")){
        window.location.href="home.html";
    }else
    {
        alert("Error, debe completar todos los campos.");
    }
}

