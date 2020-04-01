
const NASAkey = "lT8C7XTazAeVBE1LDknOxvFf8ySpSe2m5uYCETYS"; //api key I received from nasa
const NASAurl = "https://api.nasa.gov/planetary/apod?api_key="; //url of nasa api

 getDataNASA(); //call of function

 function getDataNASA(){ //begining of function
    const xhttp = new XMLHttpRequest(); //constant to call XMLHttp request function
    xhttp.onreadystatechange = function(){ //when the request is received anonymus function is triggered
        if (this.readyState == 4 && this.status == 200){// if the request has been received properly
            const data = JSON.parse(this.responseText);//store the data in JSON format in "data" constant
            console.log(data);
            renderNASA(data); // calling another function + passing data var
        }
    }
    xhttp.open('GET', NASAurl + NASAkey,true); //setting up the request
    xhttp.send();//sending the request
}

function renderNASA(data){ 
    console.log(data);
    document.querySelector('body').innerHTML= `
    <p>${data.explanation}</p>
    <img class="image" src="${data.url}" alt="APOD">
    <h1>${data.title}</h1>
    `//targeting body tag indide our html and filling it with tags and data that we recieved from nasa
} 
