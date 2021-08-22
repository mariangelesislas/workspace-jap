var productsArray = [];

function showProductsList(array){
    //Recorre la lista para obtener cada dato
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h2 class="mb-1">`+ product.name +`</h2>
                        <b><small class="text-muted">` + product.soldCount + ` vendidos</b></small>
                    </div>
                    <br>
                    <div>
                     <h5 class="mb-1">` + product.description + `</h5>
                    </div>
                    <br>
                    <div>
                     <h4 class="mb-1">`+ product.currency + " " + product.cost +  `</h4>
                    </div>
                </div>
            </div>
        </div>
        `
        //Tiene que coincidir con el div del HTML
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;
            //Muestra la lista de productos
            showProductsList(productsArray);
        }
    });
});