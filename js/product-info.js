var product= {};
let productList =[] 
/* se crea una array vacio donde luego se pondra la informacion  /Esta es la parte obligatoria/ */
var commentArray = [];



/* Primera parte mostrar la informacion del producto */

/* funcion que va a recorrer el array donde se encuentran las imagenes del producto */
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

/* muestra la informacion de los productos relacionados*/
function showInfoOfRelated(array){

    let htmlContentToAppend = "";
    for(let i = 0; i< array.length;i++){
        let related = array[i];
        htmlContentToAppend +=`  

        <div class="text-center" style="width: 18rem;">
           <img src=" ` + productList[related].imgSrc + ` " alt=" `  + ` class="rounded">
           <div class="card-body">
              <h5 class="card-title">` + productList[related].name + `</h5>
              <p class="card-text"> ` + productList[related].currency + " " + productList[related].cost  + ` </p>
              <a href="#" class="card-link">Ver Aquí</a>
            </div>
        </div>
       `
    }
     document.getElementById("related-products").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj0){
        if (resultObj0.status === "ok")
        {
            
            product = resultObj0.data;

            /* se crean variables locales que seran igual a un elemento con un determinado id*/
            let productCategoryHTML= document.getElementById("productCategory")
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCostHTML = document.getElementById("productCost");
           /* luego a la variable sera igual al atributo  de la lista que se quiera extraer . y se imprime en pantalla */
            productCategoryHTML.innerHTML = product.category
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML= product.currency + " " + product.cost;

            
            showProductPictures(product.images);
        getJSONData(PRODUCTS_URL).then(function(resultObj1){
                productList = resultObj1.data
                showInfoOfRelated(product.relatedProducts);
            })
    
        }
    
     });
});
  







// ---------------------------------------PARTE DE COMENTARIOS--------------------------------

/* segunda parte mostrar los comentarios del JSON*/


/* esta parte la hice porque fue una idea que se me ocurrio de reutilizar el codigo de product.js para ordenar los comentarios
segun la fecha y popularidad*/
const ORDER_ASC_BY_DATE = "Actuales";
const ORDER_DESC_BY_DATE = "Antiguos";
const ORDER_BY_MOST_POPULAR = "Mas populares";
var currentSortCriteriaForComment = undefined;
/* ------------------------------------------- */




/* funcion donde se usa el sort, que lo que hara sera ordenar segun fecha del comentario y popularidad*/
function sortComment(criteria, array){
    let result = [];

    /* comentarios mas recientes*/
    if (criteria === ORDER_ASC_BY_DATE)
    {
        result = array.sort(function(a, b) {
            if ( a.dateTime > b.dateTime ){ return -1; }
            if ( a.dateTime < b.dateTime ){ return 1; }
            return 0;
        });

      /* comentarios mas antiguos */        
    }else if (criteria === ORDER_DESC_BY_DATE){
        result = array.sort(function(a, b) {
            if ( a.dateTime < b.dateTime ){ return -1; }
            if ( a.dateTime > b.dateTime ){ return 1; }              
            return 0;
        });

     /*comentarios mas populares */
    }else if (criteria === ORDER_BY_MOST_POPULAR){
        result = array.sort(function(a, b) {
            let aScore= parseInt(a.score);
            let bScore = parseInt(b.score);

            if ( aScore > bScore ){ return -1; }
            if ( aScore < bScore ){ return 1; }
            return 0;
        });
    }

    return result;
}

/* se crea una array vacio donde luego se pondra la informacion  /Esta es la parte obligatoria/ */
var commentArray = [];

/* funcion que recorre una lista para extrar la infomormacion y luego la imprime en pantalla*/
// en este caso va a ser el nombre de usuario, fecha, comentario y calificacion 
function showComment(){

    let htmlContentToAppend = "";
    for(let i = 0; i < commentArray.length; i++){
        let comment = commentArray[i];

            htmlContentToAppend += `
            
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comment.user +`</h4>
                            <h6 class="mb-1">`+ comment.dateTime +  `</h6>
                            <h6 class="mb-1">` + "Calificación:" + " " + comment.score + ` </h6>
                        </div>
                        
                        <h4 class="mb-1">`+ comment.description + `</h4>
                        </div>
                    </div>
                </div>
                <hr>
            
            `
        }

        document.getElementById("comment-list-container").innerHTML = htmlContentToAppend;
    }

    /*funcion que va ordenar y mostrar los comentarios segun el criterio que se seleccione */
function sortAndShowComment(commentSortCriteria, commentArray){
    currentSortCriteriaForComment = commentSortCriteria;

    if(commentArray != undefined){
        currentCommentArray = commentArray;
    }

    currentCommentArray = sortComment(currentSortCriteriaForComment, currentCommentArray);

    //Muestra los cometarios
    showComment();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            commentArray = resultObj.data;
            // de estar todo bien, los comentarios apareceran ordenados por mas recientes
            sortAndShowComment(ORDER_ASC_BY_DATE, resultObj.data);
        }
    });
    
    document.getElementById("sortAscByDate").addEventListener("click", function(){
        sortAndShowComment(ORDER_ASC_BY_DATE);
    });

    document.getElementById("sortDescByDate").addEventListener("click", function(){
        sortAndShowComment(ORDER_DESC_BY_DATE);
    });

    document.getElementById("sortByMostPopular").addEventListener("click", function(){
        sortAndShowComment(ORDER_BY_MOST_POPULAR);

        showComment();
    });
});
        
// las funciones anteriores se encargan de dar funcionabilidad a los botones
// asi cuando uno da click se puede ver ordenados los comentarios
// segun el criterio que uno desee 
// accede al elemento con un determinado id, que tiene que estar nombrado
// segun la funcion que cumple.
// y una vez dado click, la funcion sortandShowcomment(x) x=criterio que uno quiere
// se pondra en marcha


