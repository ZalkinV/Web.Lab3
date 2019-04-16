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

    var imagesLoaded = 0;
    for (var i = 0; i < 4; i++)
    {
        var img = new Image();
        img.src = "https://source.unsplash.com/collection/190727/100x100";
        img.onload = function() 
        {
            var x = imagesCrossing.x * (imagesLoaded % 2);
            var y = imagesCrossing.y * Math.floor(imagesLoaded / 2);
            var width = imagesLoaded % 2 == 0 ? imagesCrossing.x : canvas.width - imagesCrossing.x;
            var height = Math.floor(imagesLoaded / 2) == 0 ? imagesCrossing.y : canvas.height - imagesCrossing.y;
            
            ctx.drawImage(img, x, y, width, height);
            imagesLoaded++;
        }
    }
}

function initializeCitate(response)
{
    citate = response.quoteText;
    createHTML();
}

createJSONP();
