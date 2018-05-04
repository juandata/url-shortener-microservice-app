# API Micro Service: URL Shortener Microservice


**Description**: 
This is one of the 10 FreeCodeCamp challenges designed to get the FCC backend certification. You can check the specific requirements here: https://www.freecodecamp.org/challenges/url-shortener-microservice

This microservice is a FullStack javaScript app that shortens the url adresss you add after /new/ example:

Lets say you want the url adress http://www.juandavidarce.co/ to be shortened, then you write in the url: 
https://url-shortener-microservice-app.glitch.me/new/http://www.juandavidarce.co/
You will get an object response with the original url you add as a parameter and the new shortened url:
{ "original_url":"http://www.juandavidarce.co/", "short_url":"https://url-shortener-microservice-app.glitch.me/XXX" }


**Error Handling**:
If you write an incorrect url the app will return an error response in the object:
https://url-shortener-microservice-app.glitch.me/new/htp://wrongurl.com
**User stories**:

1.  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2.  If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

3. When I visit that shortened URL, it will redirect me to my original link.

**Developed by** *Juan David Tabares Arce*