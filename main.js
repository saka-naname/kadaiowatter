const mode = "backgroundOwatta";
const contentsComplete = document.querySelector(".contents-detail.contents-complete");
if(contentsComplete){
    if(mode === "backgroundOwatta"){
        document.head.insertAdjacentHTML("beforeEnd",`
        <style>
        #pageMain{
            background-image: url(chrome-extension://${chrome.runtime.id}/img/kadaiowatta.png);
            background-size: cover;
        }
        .course-header {
            background-color: #FFF7;
            box-shadow: none;
        }
        .login-view {
            background: none;
        }
        .page-foot {
            background-color: #ECEBEA44;
        }
        #page_head{
            backdrop-filter: blur(10px);
            background-image: linear-gradient(180deg, #e8ebf078, #ffffff94);
            background-color: transparent;
        }
        </style>
        `);
    }else{
        const elementKadaiOwatta = document.createElement("img");
        elementKadaiOwatta.src = `chrome-extension://${chrome.runtime.id}/img/kadaiowatta.png`;
        elementKadaiOwatta.classList = "kadaiowatta";
        const kadaiOwattaContainer = document.createElement("div");
        kadaiOwattaContainer.classList = "kadaiowatta-container";
        kadaiOwattaContainer.appendChild(elementKadaiOwatta);
        document.querySelector(".contents-title").appendChild(kadaiOwattaContainer);
        document.querySelector(".block").remove();
    }
}