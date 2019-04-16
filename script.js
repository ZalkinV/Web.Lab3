"use strict"

function citateResponse(response)
{
    alert(response.quoteText);
}

var requestBody = "method=" + encodeURIComponent("getQuote") + 
    "&format=" + encodeURIComponent("jsonp") +
    "&lang=" + encodeURIComponent("ru") + 
    "&jsonp=" + encodeURIComponent("citateResponse");

var jsonpRequest = document.createElement("script");
jsonpRequest.src = "https://api.forismatic.com/api/1.0/?" + requestBody;
jsonpRequest.async = true;
document.head.appendChild(jsonpRequest);

