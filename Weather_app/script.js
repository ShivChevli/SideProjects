const time = document.querySelector(".time");
const icon = document.querySelector(".icon");
const el = document.querySelector(".details");
const card = document.querySelector(".card");

document.querySelector("form").addEventListener("submit", async (event) => {

    event.preventDefault();
    console.log(event);
    console.log(event.target.elements["city"].value);
    let city_name = event.target.elements["city"].value;

    let data = null;
    try {
        data = await updateCity(city_name);
    } catch (error) {
        console.log("Error : " + error);
    }
    updateUI(data);
    // let city_code = "202441";

    document.querySelector("#city_name").value = "";
}) 

const updateUI = (data) => {
    
    const error_alert = document.querySelector("#error");
    if (data == null) {
        error_alert.classList.remove("d-none")
        return;
    } else {
        if (!error_alert.classList.contains("d-none")) {
            error_alert.classList.add("d-none")
        }
    }

    let { city_data, weather_data } = data;
    console.log(data);


    // show detail card
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
    }

    time.src = `/img/${weather_data.IsDayTime ? "day.svg" : "night.svg"}`; 
    icon.src = `/img/icons/${weather_data.WeatherIcon}.svg`;

    //update card data 
    el.innerHTML = `
            <h5 class="my-3">${city_data.EnglishName}</h5>
            <div class="my-3">${weather_data.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather_data.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
    `;

}

const updateCity = async (city_name) => {
    let city_data = await getCityCode(city_name);
    let weather_data = await getWetherData(city_data.Key);
    
    return { city_data, weather_data };
}

const getCityCode = async (city_name) => {
    
    let response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city_name}`);
    if (response.status != 200) {
        throw Error("Can not fetch city code");
    }
    let data = await response.json();
    console.log(data);
    console.log(data[0].Key);

    return data[0];
}

const getWetherData = async (city_code) => {
    let response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${city_code}?apikey=${API_KEY}`)
    if (response.status != 200) {
        throw Error("Wether data has not fetched");
    }
    let data = await response.json();
    return data[0];
}