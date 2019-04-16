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
    document.body.style.margin = 0;
    document.body.style.overflow = "hidden";

    var mainDiv = document.createElement("div");
    mainDiv.width = document.documentElement.clientWidth;
    mainDiv.height = document.documentElement.clientHeight;
    document.body.appendChild(mainDiv); 


    var canvas = document.createElement("canvas");
    canvas.width = mainDiv.width;
    canvas.height = mainDiv.height;
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = "https://source.unsplash.com/collection/190727";
    img.onload = function() 
    {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function initializeCitate(response)
{
    citate = response.quoteText;
    createHTML();
}

createJSONP();
