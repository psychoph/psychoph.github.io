---
layout: post
title: "Game Time Scrapper"
date: "2013-12-22 19:28"
author: Jason Hardin
pageclass: programming
---
I track my time played in video games against what I paid for the game. Ultimately to figure out by cost per hour of game play. I have been using Raptr’s client for most of this year along with a [Google apps spreadsheet](https://www.google.com/work/apps/business/products/?utm_source=google&utm_medium=cpc&utm_campaign=na-us-en-apps-bkws-gafw-trial-e&utm_content=text-appstest-c-products) to track my costs per hour. One of the issues I ran into however is that I have to manually add the play time from [Raptr](http://raptr.com/) to the spreadsheet at the end of the week. This is a pain when I know that I can get this data grammatically. I create a game time scrapper program in Node js to convert the data on Raptr’s recent played games page to a JSON string that can then be processed by Google Apps with a custom script.

You can download the game time scrapper code from github at https://github.com/psychoph/gametime. Originally I had a OpenShift account setup with zombie to process the page, thinking I could also create a process to load all games that Raptr tracked not just the most recent. I ran into an issue with OpenShift’s free server and node js modules taking up more than the 1 gig of space that was given. Zombie was over kill for the project because I could not figure out how to get Zombie to loop through clicking a button. I started the project based on the tutorial [How to Scrape Web Pages with Node.js and jQuery](http://net.tutsplus.com/tutorials/javascript-ajax/how-to-scrape-web-pages-with-node-js-and-jquery/) and then modified the selectors based on the Raptr page.

Once I got the game time scrapper script working I created the following Google Apps script:

{% highlight js linenos %}
/**
 * Retrieves all the rows in the active spreadsheet that contain data and logs the
 * values for each row.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function raptrRecent() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var url = 'http://gamebinder.jasonhardin.com:9000/raptr/recent/psychoph';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var games = Utilities.jsonParse(json);
  Logger.log(games);
  var notfound = [];
  for(var j = 0; j < games.length; j++){
    var found = false;
/// Skip row one it is headers
    for (var i = 1; i <= numRows - 1; i++) {
      var name = values[i][0];
      var hours = values[i][2];

      if(games[j].title == name){
        found = true;
        if(games[j].title == name && hours < games[j].time){
          Logger.log('Update to '+games[j].title+' '+games[j].time);

      /// Need to increase row and column by once because the spread sheet starts at 1 for get range and 0 for getDataRange
          var rownum = i +1;
          sheet.getRange(rownum,3).setValue(games[j].time);
        }
      }
    }

    if(!found){
      notfound.push(games[j]);
    }
  }
  addGames(sheet,notfound,numRows);
};

function addGames(sheet,games,maxRow){
  for(var i = 0; i < games.length;i++){
    var afterrow = maxRow+i;
    var rownum = afterrow+1;
    sheet.insertRowAfter(afterrow);
    sheet.getRange(rownum,1).setValue(games[i].title);
    sheet.getRange(rownum,2).setValue(1000);
    sheet.getRange(rownum,3).setValue(games[i].time);
    sheet.getRange(rownum,4).setFormula("=round(B"+rownum+"/C"+rownum+", 2)");
    sheet.getRange(rownum,5).setFormula("=B"+rownum+"-C"+rownum);
    sheet.getRange(rownum,6).setFormula("=B"+rownum+"*2-C"+rownum);
  }
}

/**
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Raptr: Recent",
    functionName : "raptrRecent"
  }];
  sheet.addMenu("Game Data", entries);
};
{% endhighlight %}

The Google Apps code loops through the JSON records from the game time scrapper and then compares the records with the rows of the spreadsheet. If I didn’t find a game with that name it creates one with the calculations that I do. The columns for the spread sheet are:

1. Game name
1. Cost
1. hours played
1. Cost per hour
1. Hours to play to reach 1 dollar per hour
1. Hours to play to reach 50 cents per hour

I set the cost to $1k just to highlight the row for me and identify I need to update it with the actual cost of the game. Usually I just end up copying the game name to an existing record and rerun the script.
