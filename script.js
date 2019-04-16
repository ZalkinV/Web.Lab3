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
    drawImages(canvas);
}

function drawImages(canvas)
{
    var ctx = canvas.getContext("2d");

    var imagesCrossing = 
    {
        x: Math.round(Math.random() * canvas.width),
        y: Math.round(Math.random() * canvas.height),
    };

    for (var i = 0; i < 4; i++)
    {
        var img = new Image();
        img.data = 
        {
            x: imagesCrossing.x * (i % 2),
            y: imagesCrossing.y * Math.floor(i / 2),
            width: i % 2 == 0 ? imagesCrossing.x : canvas.width - imagesCrossing.x,
            height: Math.floor(i / 2) == 0 ? imagesCrossing.y : canvas.height - imagesCrossing.y,
        }
        img.onload = function() 
        {
            ctx.drawImage(this, this.data.x, this.data.y, this.data.width, this.data.height);
        }
        img.src = "https://source.unsplash.com/collection/190727/" + img.data.width + "x" + img.data.height;
    }
}

function initializeCitate(response)
{
    citate = response.quoteText;
    createHTML();
}

createJSONP();
