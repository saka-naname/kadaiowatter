const contentsComplete = document.querySelector(".contents-detail.contents-complete");
if(contentsComplete){
    const elementKadaiOwatta = document.createElement("img");
    elementKadaiOwatta.src = `chrome-extension://${chrome.runtime.id}/img/kadaiowatta.png`;
    elementKadaiOwatta.classList = "kadaiowatta";
    const kadaiOwattaContainer = document.createElement("div");
    kadaiOwattaContainer.classList = "kadaiowatta-container";
    kadaiOwattaContainer.appendChild(elementKadaiOwatta);
    document.querySelector(".contents-title").appendChild(kadaiOwattaContainer);
    document.querySelector(".block").remove();
}