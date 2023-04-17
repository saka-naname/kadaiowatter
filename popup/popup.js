const defaultOptions = {
    backgroundOwatta: true
}

function saveOptions(){
    const backgroundOwatta = document.getElementById("backgroundOwatta").checked;
    console.log(backgroundOwatta);
    chrome.storage.local.set({
        backgroundOwatta: backgroundOwatta
    }, function(){
        console.log("設定を保存しました");
    });
}

function loadOptions(){
    chrome.storage.local.get(defaultOptions, function(items){
        document.getElementById("backgroundOwatta").checked = items.backgroundOwatta;
    });
}

loadOptions();
const checkboxes = document.querySelectorAll("input.option.checkbox");
for(const checkbox of checkboxes){
    checkbox.addEventListener("change", saveOptions);
}
