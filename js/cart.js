var cartList = [];
let subTotal; //  para funcion que calcula el valor de cada producto
let totalCart;//  para calcular el total entre los subproductos y el costo de envios
let subTotalProducts = 0; // para calcular la suma de los subtotales de todos los productos
let shippingCostVar = 0;
let shippingPorcentageVar = 0.15;



// funcion que actualiza el subtotal cuando se cambia en valor de la cantidad de productos
function updateSubtotal(count,unitCost,id,currency) {
    subTotal = count*unitCost;
    document.getElementById("subtotal"+id).innerHTML = currency + " " +  subTotal;
    subTotalCart();
    shippingCostProduct(shippingPorcentageVar);
    
    

}

//funcion que muesta el precio total entre los productos + el costo de envio
function updateTotalCart(){ 
  
   
        totalCart = subTotalProducts + shippingCostVar ;
    
    
    document.getElementById("grandtotal").innerHTML = "UYU" + " " + totalCart;
    
}

// funcion que calcula el costo de envio. 
function shippingCostProduct(shippingporsentage){
    shippingPorcentageVar = shippingporsentage

    shippingCostVar = shippingPorcentageVar * subTotalProducts;
    document.getElementById("shippingcost").innerHTML = "UYU" + " " +shippingCostVar;
    updateTotalCart();
    



}
// funcion que muestra el subtotal del carrito (suma de todos los subtotales)
function subTotalCart(){
    
    subTotalProducts = 0;
    let subTotalDOM = document.getElementsByClassName("subtotal");
    for (subtotal of subTotalDOM){
        subTotalProducts += parseFloat(subtotal.innerHTML.split(" ")[1]);
    }
    document.getElementById("subT").innerHTML = "UYU" + " " + subTotalProducts;
    

}

// funcion que elimina los productos
function delateproduct(id){
    var delateproduct = document.getElementById("remove"+id);
    delateproduct.remove();
    cartList.splice(id,1) // tambien lo elimina del cartlist
  
    updateTotalCart();
    subTotalCart();
    shippingCostProduct(shippingPorcentageVar);
   
    

}

// funcion que muestra los datos del carrito
function showCartList(){


    let htmlContentToAppend = "";
    let i = 0
     // DESAFIANTE 5 : Pasa de USD a UYU
        for(let article of cartList){
            if(article.currency == "USD"){
                article.currency = "UYU";
                article.unitCost = article.unitCost*40;

            }
            
            htmlContentToAppend += `
            
            <tr id="remove`+i+`">
            <td><img name="remove"  src="`+article.src+`" class = "img-fluid" style ="max-width:50px!important"></td>
            <td class="align-middle" >`+article.name+`</td>
            <td class="align-middle" >`+article.currency + " " + article.unitCost +`</td>
            <td class="align-middle" ><input type="number" min ="1" value=`+ article.count+` id ="`+i+`" onchange="updateSubtotal(this.value,`+article.unitCost+`,`+i+`,'`+article.currency+`')"></td> 
            <td class="align-middle subtotal" id="subtotal`+i+`">`+article.currency + " " + article.count * article.unitCost +`</td>      
            <td class="align-middle"><button class="close" onclick="delateproduct(`+i+`)">Borrar</td> 
            </tr>
            
            `
           
            
            i++;
           
        }
     // muestra en el html la informacion
    document.getElementById("cart").innerHTML = htmlContentToAppend;
    subTotalCart();
    shippingCostProduct(shippingPorcentageVar);


 

}



// funcion que obtiene la informacion del json

getJSONData(CART_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        
        cartList = resultObj.data.articles;
        showCartList();
        
    }
});









// Funcion que desabilita los input de acuerdo al modo de pago(radio) que se selecciono

//________________________________________________________________

document.getElementById("transferencia-bancaria").addEventListener("change",function(){
    document.getElementById("numero-de-cuenta").disabled = false;

    //___________________________________________

    document.getElementById("numero-de-tarjeta").disabled = true;
    document.getElementById("codigo-de-seguridad").disabled = true;
    document.getElementById("vencimiento").disabled = true;
    document.getElementById("tarjeta-de-credito").disabled = true;

});

document.getElementById("tarjeta-de-credito").addEventListener("change",function(){
    document.getElementById("numero-de-tarjeta").disabled = false;
    document.getElementById("codigo-de-seguridad").disabled = false;
    document.getElementById("vencimiento").disabled = false;
    
    //___________________________________________

    
    document.getElementById("numero-de-cuenta").disabled = true;
    document.getElementById("transferencia-bancaria").disabled = true;
                         
});

// Funcion que se usa en unh boton para poder habilitar el boton que fue deshabilitado

function enablePaymentMethodRadios(){
        document.getElementById("transferencia-bancaria").disabled = false;
        document.getElementById("tarjeta-de-credito").disabled = false;
        document.getElementById("transferencia-bancaria").checked = false;
        document.getElementById("tarjeta-de-credito").checked = false;    
}



//_________________________________________________

// funcion que valida los campos de dirreccion 

function validateCartDirectionFields(){

    let calle = document.getElementById("street").value;
    let numerohogar = document.getElementById("housenumber").value;
    let esquina = document.getElementById("corner").value;

    if((calle ==="") && (numerohogar ==="") && (esquina ==="")){
        
        alert("Error, debe completar todos los campos");
        
    }else
    {
        alert("¡Su compra ha sido realizada con exito!");
        
          
    }
  

}

// Funcion que valida el modal

function validatePaymentMethod(){
    let numerodetarjeta  = document.getElementById("numero-de-tarjeta").value;
    let codigodeseguridad = document.getElementById("codigo-de-seguridad").value;
    let caducidad = document.getElementById("vencimiento").value;
    let numerodecuenta = document.getElementById("numero-de-cuenta").value;

    if((numerodetarjeta !=="") && (codigodeseguridad !=="") && (caducidad !=="") && (numerodecuenta ==="") || 
    (numerodetarjeta ==="") && (codigodeseguridad ==="") && (caducidad ==="") && (numerodecuenta !=="")){
        
        alert("¡Sus datos han sido guardados");
        
    }else
    {
        alert("Campos vacios");
      
        
    }
    
}

// ______________________________


