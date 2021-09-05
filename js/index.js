function saveUsername(){
    var name = document.getElementById('username').value;
     localStorage.setItem('username', name);
};


function validarCamposVacios(){

    let usuario = document.getElementById("username").value;
    let contrasena = document.getElementById("password").value;
    // si los campos no estan vacios se redirecciona al archivo home
    if((usuario =="")&& (contrasena =="")){
        alert("Error, debe completar todos los campos.");
        
    }else
    {
        saveUsername()
        document.location.href="products.html";
    }
}
