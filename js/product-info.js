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





const ORDER_ASC_BY_DATE = "Actuales";
const ORDER_DESC_BY_DATE = "Antiguos";
const ORDER_BY_MOST_POPULAR = "Mas populares";
var currentSortCriteriaForComment = undefined;
var commentArray = [];

function sortComment(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_DATE)
    {
        result = array.sort(function(a, b) {
            if ( a.dateTime > b.dateTime ){ return -1; }
            if ( a.dateTime < b.dateTime ){ return 1; }
            return 0;
        });

      /* funcion que ordena de menor a mayor segun precio*/        
    }else if (criteria === ORDER_DESC_BY_DATE){
        result = array.sort(function(a, b) {
            if ( a.dateTime < b.dateTime ){ return -1; }
            if ( a.dateTime > b.dateTime ){ return 1; }              
            return 0;
        });

     /*funcion que ordena en ordena de mayor a emnor segun relevancia (prductos mas vendidos) */
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

    /*funcion que muestra segun el criterio y el array*/
function sortAndShowComment(commentSortCriteria, commentArray){
    currentSortCriteriaForComment = commentSortCriteria;

    if(commentArray != undefined){
        currentCommentArray = commentArray;
    }

    currentCommentArray = sortComment(currentSortCriteriaForComment, currentCommentArray);

    //Muestro los productos ordenados
    showComment();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            commentArray = resultObj.data;
            sortAndShowComment(ORDER_ASC_BY_DATE, resultObj.data);
        }
    });
     // nos permite poder darle funcionabilidad al boton
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
            
          