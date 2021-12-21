chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get(['blockId','spaceId'], function(result) {
        let blockId = result.blockId;
        let spaceId = result.spaceId;
        if (blockId && spaceId) {
            let url = tab.url;
            chrome.tabs.update(tab.id, {
                url: `craftdocs://createblock?parentBlockId=${blockId}&spaceId=${spaceId}&index=999999&content=${encodeURIComponent(url)}`
            });
        } else {
            chrome.runtime.openOptionsPage();
        }
    });

});
