var cartList = [];
let subTotal; //  para funcion que calcula el valor de cada producto
let totalCart;//  para calcular el total entre los subproductos y el costo de envios
let subTotalProducts = 0; // para calcular la suma de los subtotales de todos los productos
let shippingCostVar = 0;
let shippingPorcentageVar = 0.15;



// funcion que actualzia el subtotal cuando se cambia en valor de la cantidad de productos
function updateSubtotal(count,unitCost,id,currency) {
    subTotal = count*unitCost;
    document.getElementById("subtotal"+id).innerHTML = currency + " " +  subTotal;
    subTotalCart();
    shippingCostProduct(shippingPorcentageVar);

}


function updateTotalCart(){ 
  
   
        totalCart = subTotalProducts + shippingCostVar ;
    
    
    document.getElementById("grandtotal").innerHTML = "UYU" + " " + totalCart;
}


function shippingCostProduct(shippingporsentage){
    shippingPorcentageVar = shippingporsentage

    shippingCostVar = shippingPorcentageVar * subTotalProducts;
    document.getElementById("shippingcost").innerHTML = "UYU" + " " +shippingCostVar;
    updateTotalCart();



}

function subTotalCart(){
    
    subTotalProducts = 0;
    let subTotalDOM = document.getElementsByClassName("subtotal");
    for (subtotal of subTotalDOM){
        subTotalProducts += parseFloat(subtotal.innerHTML.split(" ")[1]);
    }
    document.getElementById("subT").innerHTML = "UYU" + " " + subTotalProducts;
    

}


// funcion que muestra los datos del carrito
function showCartList(){


    let htmlContentToAppend = "";
    let i = 0
        for(let article of cartList){
            if(article.currency == "USD"){
                article.currency = "UYU";
                article.unitCost = article.unitCost*40;

            }
            
            htmlContentToAppend += `
            
            <tr>
            <td><img src="`+article.src+`" class = "img-fluid" style ="max-width:50px!important"></td>
            <td class="align-middle">`+article.name+`</td>
            <td class="align-middle">`+article.currency + " " + article.unitCost +`</td>
            <td class="align-middle"><input type="number" min ="1" value=`+ article.count+` id ="`+i+`" onchange="updateSubtotal(this.value,`+article.unitCost+`,`+i+`,'`+article.currency+`')"></td> 
            <td class="align-middle subtotal" name="sub" id="subtotal`+i+`">`+article.currency + " " + article.count * article.unitCost +`</td>

            </tr>`
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


function enablePaymentMethodRadios(){
        document.getElementById("transferencia-bancaria").disabled = false;
        document.getElementById("tarjeta-de-credito").disabled = false;
        document.getElementById("transferencia-bancaria").checked = false;
        document.getElementById("tarjeta-de-credito").checked = false;    
}



//_________________________________________________



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


