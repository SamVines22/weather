import './styles.css';


function buildPage() {

    let wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.querySelector("body").appendChild(wrapper);
    let header = document.createElement("div");
    header.id = "header";
    header.innerText = "Weather App!";
    wrapper.appendChild(header);
    let formHolder = document.createElement("div");
    formHolder.id = "formHolder";
    formHolder.class = "formHolder";
    formHolder.innerHTML = 
    `<form>
    <label for = "location"> Location </label>
    <input type = "text" id = "location">
    <button type = "submit" id = "btn">Submit</button>
    </form>
    `
    wrapper.appendChild(formHolder);
    let btn = document.getElementById("btn");
    btn.addEventListener("click", submit);



}

async function getWeather(city) {
    try {
        const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=3afebed7ecae4c4dad223436241602&q=${city}`, {mode: "cors"})
        if (data.ok) {
            const weather = await data.json();
            return weather;
        }
        else {
            
            const reason = await data.json();
            console.log(reason.error.message);
            let errMessage = reason.error.message;
            
            return errMessage;
        }
        }
    catch(err) {
       
        return err;
    }
}

async function submit(btn) {
    btn.preventDefault();
    let search = document.getElementById("location").value;
    let weatherData = await getWeather(search);
    let testVal = /No matching*/i;
    if (testVal.test(weatherData)== false){
    displayWeather(weatherData);
    }
    else { 
        
        notFound(weatherData); 
    }
}

function displayWeather(data){
    if (document.getElementById("weatherHolder")!= null)
    {
        document.getElementById("weatherHolder").remove();
    }
    const place = data.location.name;
    const country = data.location.country;
    const weather = data.current.condition.text;
    const temp = data.current.temp_c;
    const wind = data.current.wind_mph;
    const windDir = data.current.wind_dir;
    let weatherHolder = document.createElement("div");
    weatherHolder.id = "weatherHolder";
    let weatherHeader = document.createElement("div");
    weatherHeader.id = "weatherHeader";
    weatherHeader.innerText = `${place}, ${country}`;
    weatherHolder.appendChild(weatherHeader);
    let weatherBody = document.createElement("div");
    weatherBody.id = "weatherBody";
    let weatherInfo = document.createElement("div");
    weatherInfo.className = "info";
    weatherInfo.innerText = `${weather}`;
    weatherBody.appendChild(weatherInfo);
    let tempInfo = document.createElement("div");
    tempInfo.className = "info";
    tempInfo.innerHTML = `${temp} <sup>0</sup>C`;
    weatherBody.appendChild(tempInfo);
    let windInfo = document.createElement("div");
    windInfo.className = "info";
    windInfo.innerText = `${wind} mph, ${windDir}`;
    weatherBody.appendChild(windInfo);
    weatherHolder.appendChild(weatherBody);
    document.getElementById("wrapper").appendChild(weatherHolder);

}

function notFound(message){
    let preErr = document.getElementById("error");
    if (preErr != null)
    {
        preErr.remove();
    }
    let header = document.getElementById("weatherHeader");
    let body = document.getElementById("weatherBody");
    if (header != null)
    {
        header.style.display = "none";
    }
    if (body != null)
    {
        body.style.display = "none";
    }
    let messageDiv = document.createElement("div");
    messageDiv.id = "error";
    messageDiv.innerText = `${message}`;
    try {
    let weatherHolder = document.getElementById("weatherHolder");
    weatherHolder.appendChild(messageDiv);
    document.getElementById("wrapper").appendChild(weatherHolder);
    }
    catch
    {
        let weatherHolder = document.createElement("div");
        weatherHolder.id = "weatherHolder";
        weatherHolder.appendChild(messageDiv);
    document.getElementById("wrapper").appendChild(weatherHolder);
    }
    
    

}

buildPage();

