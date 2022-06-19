const defaultOptions = {
    backgroundOwatta: false
}

chrome.storage.local.get(defaultOptions, function(items){
    const backgroundOwatta = items.backgroundOwatta;

    const contentsComplete = document.querySelector(".contents-detail.contents-complete");
    if(contentsComplete){
        if(backgroundOwatta){
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

        //  ツイートボタンを追加
        const courseTitle = document.querySelector(".course-title-txt").textContent
            .replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/`/g, "&#x60;");
        const courseTitleItems = /(.+)\s([0-9]{2}[A-Z]{2}[0-9]{6})\s(.+)/.exec(courseTitle);
        if(courseTitleItems !== null){
            const elementTweetButton = document.createElement("a");
            elementTweetButton.href = "javascript:void(0);";
            elementTweetButton.classList = "twitter-share-button under-btn btn-txt btn-color courseOnReportComplete";
            elementTweetButton.textContent = "ツイートする";
            elementTweetButton.addEventListener("click", function(){
                let tweetWindow = window.open(`https://twitter.com/intent/tweet?text=${decodeURIComponent(courseTitleItems[3] + "の課題を提出しました！")}%20pic.twitter.com%2FOe2i83sZWf&hashtags=kadaiowatter`, "kadaiowattaTweet", "width=640, height=480, innerWidth=640, innerHeight=480");
            });
            document.getElementsByClassName("underButtonArea")[0].appendChild(elementTweetButton);
        }
    }
});
