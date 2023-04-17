const defaultOptions = {
    backgroundOwatta: true
}

if (location.href ===        "https://scombz.shibaura-it.ac.jp/lms/course/report/submission" || 
    location.href.startsWith("https://scombz.shibaura-it.ac.jp/lms/course/surveys/take?complete" || 
    location.href.startsWith("https://scombz.shibaura-it.ac.jp/lms/course/examination/take?complete")
    )) {
    chrome.storage.local.get(defaultOptions, function (items) {
        const backgroundOwatta = items.backgroundOwatta;

        const contentsComplete = document.querySelector(".contents-detail.contents-complete");
        if (contentsComplete) {
            //クソデカオワッター
            if (backgroundOwatta) {
                document.head.insertAdjacentHTML("beforeEnd", `
            <style>
            #pageMain{
                background-image: url(${chrome.runtime.getURL("img/kadaiowatta.png")}) !important;
                background-size: cover;
                background-blend-mode: unset !important;
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
            } else {
                //通常オワッター
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
            if (courseTitleItems !== null) {
                document.head.insertAdjacentHTML("beforeend", `
            <style>
            .twitter-share-button{
                background-color: #fff;
                color: #0f1419;
                border-radius: 500px;
                border: 2px solid #e8eff3;
                font-size: 16px;
                font-family: Arial,"ヒラギノ角ゴ Pro W3";
                font-weight: bold;
                width: 60% !important;
                padding: 2px 0 0 6.5%;
            }
            .twitter-share-button::before {
                content: "";
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxvZ28iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQ4IDIwNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQ4IDIwNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMxRDlCRjA7fQo8L3N0eWxlPgo8ZyBpZD0iTG9nb18xXyI+Cgk8cGF0aCBpZD0id2hpdGVfYmFja2dyb3VuZCIgY2xhc3M9InN0MCIgZD0iTTIyMS45NSw1MS4yOWMwLjE1LDIuMTcsMC4xNSw0LjM0LDAuMTUsNi41M2MwLDY2LjczLTUwLjgsMTQzLjY5LTE0My42OSwxNDMuNjl2LTAuMDQgICBDNTAuOTcsMjAxLjUxLDI0LjEsMTkzLjY1LDEsMTc4LjgzYzMuOTksMC40OCw4LDAuNzIsMTIuMDIsMC43M2MyMi43NCwwLjAyLDQ0LjgzLTcuNjEsNjIuNzItMjEuNjYgICBjLTIxLjYxLTAuNDEtNDAuNTYtMTQuNS00Ny4xOC0zNS4wN2M3LjU3LDEuNDYsMTUuMzcsMS4xNiwyMi44LTAuODdDMjcuOCwxMTcuMiwxMC44NSw5Ni41LDEwLjg1LDcyLjQ2YzAtMC4yMiwwLTAuNDMsMC0wLjY0ICAgYzcuMDIsMy45MSwxNC44OCw2LjA4LDIyLjkyLDYuMzJDMTEuNTgsNjMuMzEsNC43NCwzMy43OSwxOC4xNCwxMC43MWMyNS42NCwzMS41NSw2My40Nyw1MC43MywxMDQuMDgsNTIuNzYgICBjLTQuMDctMTcuNTQsMS40OS0zNS45MiwxNC42MS00OC4yNWMyMC4zNC0xOS4xMiw1Mi4zMy0xOC4xNCw3MS40NSwyLjE5YzExLjMxLTIuMjMsMjIuMTUtNi4zOCwzMi4wNy0xMi4yNiAgIGMtMy43NywxMS42OS0xMS42NiwyMS42Mi0yMi4yLDI3LjkzYzEwLjAxLTEuMTgsMTkuNzktMy44NiwyOS03Ljk1QzI0MC4zNywzNS4yOSwyMzEuODMsNDQuMTQsMjIxLjk1LDUxLjI5eiIvPgo8L2c+Cjwvc3ZnPgo=);
                background-size: contain;
                width: 26px;
                height: 30px;
                background-repeat: no-repeat;
                float: left;
                position: absolute;
                transform: translate(-70px,3px);
            }
            </style>
            `);
                // ツイートボタンの作成
                const elementTweetButton = document.createElement("a");
                elementTweetButton.href = "javascript:void(0);";
                elementTweetButton.classList = "twitter-share-button under-btn btn-txt btn-color courseOnReportComplete";
                elementTweetButton.textContent = "ツイートする";
                // ツイート文の作成
                const tweetString = function(){
                    switch (location.href.replace("https://scombz.shibaura-it.ac.jp/lms/course/","").split("/")[0]){
                        case "report":
                            return "の課題を提出しました！";
                            break;
                        case "surveys":
                            return "のアンケートに回答しました！";
                            break;
                        case "examination":
                            return "のテストに解答しました！";
                            break;
                        default:
                            return "の課題を提出しました！";
                            break;
                    };
                }
                // ツイートボタンのクリック時の処理
                elementTweetButton.addEventListener("click", function () {
                    let tweetWindow = window.open(`https://twitter.com/intent/tweet?text=${decodeURIComponent(courseTitleItems[3] + tweetString())}%20pic.twitter.com%2FOe2i83sZWf&hashtags=kadaiowatter`, "kadaiowattaTweet", "width=640, height=480, innerWidth=640, innerHeight=480");
                });
                // ツイートボタンの挿入
                document.getElementsByClassName("underButtonArea")[0].appendChild(elementTweetButton);
            };
        };
    });
}