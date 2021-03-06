var commentArray = [];

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
});