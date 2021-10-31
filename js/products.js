const ORDER_ASC_BY_COST = "Mas a Menos";
const ORDER_DESC_BY_COST = "Menos a Mas";
const ORDER_BY_PROD_SOLDCOUNT = "Relevancia";
var currentProductsArray = [];  /* array vacio donde se ira guardando informacion */
var currentSortCriteriaForProducts = undefined;
var minCost = undefined;  /* Variable de Costo Minimo*/
var maxCost = undefined;  /*Variable de Costo Maximo */




   /* funcion que ordena  de mayor a menor segun precio*/
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });

      /* funcion que ordena de menor a mayor segun precio*/        
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }              
            return 0;
        });

     /*funcion que ordena en ordena de mayor a emnor segun relevancia (prductos mas vendidos) */
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if ( aSoldCount > bSoldCount ){ return -1; }
            if ( aSoldCount < bSoldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){
            
               // recorre la lista para obtener todos los elementos del JSON 
            htmlContentToAppend += `
            
                <div class="col-lg-6 mb-4">
                    <div class="card h-100">
                        <a href="product-info.html"><img src="` + product.imgSrc + `" class="card-img-top"></a>
                        <div class="card-body">
                            <h4 class="card-title">
                                <h4>`+ product.name +`</h4>
                                
                            </h4>
                            <p class="card-text">` + product.description + `</p>
                            <h4 class="mb-1">`+ product.currency + " " + product.cost +  `</h4>
                            <p class="text-muted">` + product.soldCount + ` vendidos</p>
                        </div>
                    </div>
                </div>
    
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}


/*funcion que muestra la lista segun el criterio dado de mayor precio a menor o viceversa, o por relevancia */
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteriaForProducts = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteriaForProducts, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            /*De estar todo ok la lista siemrpe va aparecer ordenada de mayor a menor */
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });
     // nos permite poder darle funcionabilidad al boton
    document.getElementById("sortAscByCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDescByCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilterCost").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por relevancia
        //osea los productos con mas ventas
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
});

