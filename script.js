"use strict"

var citate;

function createJSONP()
{
    var requestBody = "method=" + encodeURIComponent("getQuote") + 
    "&format=" + encodeURIComponent("jsonp") +
    "&lang=" + encodeURIComponent("ru") + 
    "&jsonp=" + encodeURIComponent("initializeCitate");

    var jsonpRequest = document.createElement("script");
    jsonpRequest.src = "https://api.forismatic.com/api/1.0/?" + requestBody;
    jsonpRequest.async = true;
    document.head.appendChild(jsonpRequest);
}

function createHTML()
{
    alert(citate);
}

function initializeCitate(response)
{
    citate = response.quoteText;
    createHTML();
}

createJSONP();
