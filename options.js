let urlField = document.getElementById("url");
let error = document.getElementById("urlError");
let updateButton = document.getElementById("updateButton");
let message = document.getElementById("message");

//chrome.storage.sync.clear(); // for debugging

// load current url
chrome.storage.sync.get(['blockId','spaceId'], function(result) {
    let blockId = result.blockId;
    let spaceId = result.spaceId;
    if (blockId && spaceId) {
        let url = `craftdocs://open?blockId=${result.blockId}&spaceId=${result.spaceId}`;
        urlField.value = url;
    } else {
        urlField.value = "";
    }
});

updateButton.addEventListener("click", () => {
    error.textContent = "";
    let url;
    try {
        url = new URL(urlField.value);
    } catch {
        error.textContent = "That does not appear to be a valid url."
        return;
    }

    let blockId = url.searchParams.get("blockId");
    let spaceId = url.searchParams.get("spaceId");
    if (!blockId || !spaceId) {
        error.textContent = "That does not appear to be a valid Deeplink URL.";
        return;
    }

    chrome.storage.sync.set({blockId, spaceId});
    window.close();
    chrome.tabs.query({ active: true }, function(tabs) {  
        chrome.tabs.remove(tabs[0].id);   
    }); 
});