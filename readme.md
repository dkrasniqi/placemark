# Placemark by Dionis Krasniqi

## About

Placemark is a web-application which helps you to save a POI (Point-of-Interest) to your User-Account and retrieve those when needed. 

### Access

 * [Hapijs Server-Side] (https://calm-sierra-28993.herokuapp.com)
 * [Svelte - Frontend] (https://placemarkbydionis.netlify.app/)

**NOTE: The Server-Side of this project has limited features. To access all features please use the Svelte-Frontend**

### Built with

* Hapijs (Server-Side & API)
* Svelte (FrontEnd)
* Bulma
* Handlebars

## How to use
In order to use **Placemark** you will need to create an account. 
You can do this on the ***Register***-tab.

After you created an account, you can log into your account on the ***Login***-tab.

When successfully logging into your account, you will be redirected to the ***Dashboard***.
There you can enter the Latitude and Longitude of your POI, the name of the POI, a description and a categorie. After doing this correctly your placemark should appear on the dashboard. 

### Images
If you want to add images to your placemark you can do this by clicking the **info-symbol** which will redirect you to your placemark and give you the option to upload a picture. When using the **Svelte-Version** you can upload multiple ones.  

##

The rest of the application should be self-explaining. By using the navigator on the top you can switch between the different functions (maps, charts, settings, etc.).

##  Contact

Dionis Krasniqi - dionis.krasniqi@st.oth-regensburg.de

Project Link: https://github.com/dkrasniqi/placemark



## Sources
The following Code-Fragment in /placemark-hapi/src/server.js was taken from: https://stackoverflow.com/questions/34252817/handlebarsjs-check-if-a-string-is-equal-to-a-value

```js
Handlebars.registerHelper("ifEquals", function (string1, string2, options) {

return  string1 === string2 ? options.fn(this) : options.inverse(this);

});
```



