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
    var mainDiv = document.createElement("div");
    mainDiv.width = document.documentElement.clientWidth;
    mainDiv.height = document.documentElement.clientHeight;
    document.body.appendChild(mainDiv); 

    
    var canvas = document.createElement("canvas");
    canvas.width = mainDiv.width;
    canvas.height = mainDiv.height;
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function initializeCitate(response)
{
    citate = response.quoteText;
    createHTML();
}

createJSONP();
