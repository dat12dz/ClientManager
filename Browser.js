var ListYTBLink = null;
var url = "http://14.189.100.137:4433";
var videoIndex = 0;
var alarmName = "Auto";
var TimeToChange = 60 * 5;
function doSomething(body)
{
    console.log(body);
}

 async function getTabId()
  {
    let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
  }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function createAlarm() {
    chrome.alarms.create(alarmName, {
        
        periodInMinutes: 0.016666666 });
      chrome.alarms.onAlarm.addListener(function(alarm) {
         main();
        console.log("runing in main");
      });
    main();
  }
createAlarm();
function turn_Off_On_Sound() {
    chrome.tabs.query({ url: [] }, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            var mutedInfo = tabs[i].mutedInfo;
            if (mutedInfo) chrome.tabs.update(tabs[i].id, { "muted": true });
        }
    })
};
 // chrome.runtime.onStartup.addListener
var TimeCounter = 0;
async function main() {
    if (TimeCounter % TimeToChange == 0) {
        var GetFile = await fetch(url + "/getLink").then((Respone) => Respone.text()).then((value) => {
            ListYTBLink = value.split('\n');
            console.log(value);
        });
        if (ListYTBLink.length <= videoIndex) videoIndex = 0;
        if (ListYTBLink != null) {

            chrome.tabs.create(
                {
                    url: ListYTBLink[videoIndex]
                }
            );
            videoIndex++;
        }
        chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length - 1; i++) {
                chrome.tabs.remove(tabs[i].id);
            }
            
        });
    }
    turn_Off_On_Sound();
    TimeCounter++;
    console.log(TimeCounter);
}