"use strict"

var citate;
var canvas;
var saveButton;
var elementsLoaded = 
{
    citate: false,
    images: 0
}

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
    createJSONP();

    document.body.style.margin = 0;
    document.body.style.overflow = "hidden";

    var mainDiv = document.createElement("div");
    mainDiv.width = document.documentElement.clientWidth;
    mainDiv.height = document.documentElement.clientHeight;
    document.body.appendChild(mainDiv); 

    canvas = document.createElement("canvas");
    canvas.width = mainDiv.width;
    canvas.height = mainDiv.height;
    document.body.appendChild(canvas);
    drawImages();

    var saveLink = document.createElement("a");
    saveLink.hidden = true;
    document.body.appendChild(saveLink);

    saveButton = document.createElement("button");
    saveButton.textContent = "Save collage";
    saveButton.style.left = 10 + "px";
    saveButton.style.top = 10 + "px";
    saveButton.style.position = "absolute";
    saveButton.onclick = function()
    {
        saveLink.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        saveLink.download = "Collage.png";
        saveLink.click();
    }
}

function drawImages()
{
    var ctx = canvas.getContext("2d");

    var imagesCrossing = 
    {
        x: randomCrossing(canvas.width, canvas.width / 4),
        y: randomCrossing(canvas.height, canvas.height / 4),
    };
    function randomCrossing(fullSize, minBorder)
    {
        var min = Math.floor(minBorder);
        var max = Math.floor(fullSize - minBorder);
        return Math.floor(Math.random() * (max + 1 - min) + min);
    };

    for (var i = 0; i < 4; i++)
    {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.data = 
        {
            x: imagesCrossing.x * (i % 2),
            y: imagesCrossing.y * Math.floor(i / 2),
            width: i % 2 == 0 ? imagesCrossing.x : canvas.width - imagesCrossing.x,
            height: Math.floor(i / 2) == 0 ? imagesCrossing.y : canvas.height - imagesCrossing.y,
        }
        img.onload = function() 
        {
            elementsLoaded.images++;
            ctx.drawImage(this, this.data.x, this.data.y, this.data.width, this.data.height);
            if (checkElementsLoading())
            {
                visualizeElements();
            }
        }
        img.src = "https://source.unsplash.com/" + img.data.width + "x" + img.data.height + "/?outdoor";
    }
}

function drawText()
{
    function createLines(ctx, words, lineWidth)
    {
        var lines = [""];
        var currentLine = 0;
        for (var i = 0; i < words.length; i++)
        {
            if (ctx.measureText(lines[currentLine] + words[i]).width < lineWidth)
            {
                lines[currentLine] += " " + words[i];
            }
            else
            {
                lines[++currentLine] = words[i];
            }
        }

        return lines;
    }

    darkenCanvas(0.6)

    var ctx = canvas.getContext("2d");
    var fontSize = 64;
    var fontHeight = fontSize * 1.2;
    ctx.font = fontSize + "px Helvetica"
    ctx.textAlign = "center"
    ctx.fillStyle = "rgb(255, 255, 255)";

    var words = citate.split(/\s/);
    var maxLineWidth = canvas.width * 0.85;
    var lines = createLines(ctx, words, maxLineWidth);
    var linesTop = canvas.height / 2 - lines.length * fontHeight / 2;

    for (var i = 0; i < lines.length; i++)
    {
        var textMeasure = ctx.measureText(lines[i]);
        console.log(lines[i] + " " + textMeasure.width);
        ctx.fillText(lines[i], canvas.width / 2, linesTop + fontHeight * (i + 1));
    }
    
}

function initializeCitate(response)
{
    citate = response.quoteText;
    elementsLoaded.citate = true;
    if (checkElementsLoading())
    {
        visualizeElements();
    }
}

function darkenCanvas(opacity)
{
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, " + opacity + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function visualizeElements()
{
    drawText();
    document.body.appendChild(saveButton);
}

function checkElementsLoading()
{
    return elementsLoaded.citate && elementsLoaded.images == 4;
}

createHTML();
