var product = {};


function showProductPictures(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productPictures").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            let productCategoryHTML= document.getElementById("productCategory")
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCostHTML = document.getElementById("productCost");
           
            productCategoryHTML.innerHTML = product.category
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML= product.currency + " " + product.cost;

            //Muestro las imagenes en forma de galería
            showProductPictures(product.images);
        }
    });
});

/*var commentArray = [];

function showComment(array){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let comment = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="d-flex w-100 justify-content-between">
                        <h2 class="mb-1">`+ comment.user + " " + "Puntuación" + " " + comment.score + " " + comment.dateTime +`</h2>
                    </div>
                    <br>
                    <div>
                     <h4 class="mb-1">`+ comment.description +`</h4>
                    </div>
                </div>
        </div>
        `
        
        document.getElementById("comment-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            commentArray = resultObj.data;
            
            showComment(commentArray);
        }
    });
}); */

var commentArray = [];

function showComment(){

    let htmlContentToAppend = "";
    for(let i = 0; i < commentArray.length; i++){
        let comment = commentArray[i];

            htmlContentToAppend += `
            
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comment.user +`</h4>
                            <small class="text-muted">` + comment.score + ` </small>
                        </div>
                        <p class="mb-1">` + comment.dateTime + `</p>
                        <br>
                     <div>
                       <h4 class="mb-1">`+ comment.description +  `</h4>
                     </div>
                    </div>
                </div>
            
            `
        }

        document.getElementById("comment-list-container").innerHTML = htmlContentToAppend;
    }


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            
            showComment();
        }
    });
});