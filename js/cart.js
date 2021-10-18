var cartList = [];
let subTotalCart;


// funcion que actualzia el subtotal cuando se cambia en valor de la cantidad de productos
function updateSubtotal(count,unitCost,id,currency) {
    subTotalCart = count*unitCost;
    document.getElementById("subtotal"+id).innerHTML = currency + subTotalCart;
    document.getElementById("grandtotal").innerHTML = currency + subTotalCart; // total 
    

}


// funcion que muestra los datos del carrito
function showCartList(){

    let htmlContentToAppend = "";
    let i = 0
        for(let article of cartList){
        
            htmlContentToAppend += `
            
            <tr>
            <td><img src="`+article.src+`" class = "img-fluid" style ="max-width:50px!important"></td>
            <td class="align-middle">`+article.name+`</td>
            <td class="align-middle">`+article.currency + " " + article.unitCost +`</td>
            <td class="align-middle"><input type="number" min ="1" value=`+ article.count+` id ="`+i+`" onchange="updateSubtotal(this.value,`+article.unitCost+`,`+i+`,'`+article.currency+`')"></td> 
            <td class="align-middle subtotal" id="subtotal`+i+`">`+article.currency + article.count * article.unitCost +`</td>

            </tr>`
            i++;

            // permite que se vea el total
             
            document.getElementById("grandtotal").innerHTML = article.currency + " " + article.count * article.unitCost;
            
            
        }
     // muestra en el html la informacion
    document.getElementById("cart").innerHTML = htmlContentToAppend;
}

// funcion que obtiene la informacion del json

getJSONData(CART_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        
        cartList = resultObj.data.articles;
        showCartList();
        
    }
});

