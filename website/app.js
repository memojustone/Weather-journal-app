// Personal API Key for OpenWeatherMap API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "e795b1de27b891a5319e56d073ded2ab";

let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
let userInfo = document.getElementById("userInfo");

// Event listener to add function to existing HTML DOM element
const generateBtn = document
  .getElementById("generate")
  .addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  getWeather(baseUrl, zipCode, apiKey)
    .then(function (data) {
      //POST request
      postData("/add", {
        temp: data.main.temp,
        date: newDate,
        content: content,
      });
    })
    .then(function () {
      updateWeather();
    })
    .catch(function (error) {
      alert("Zipcode is invalid.");
    });
  userInfo.reset();
}

/* Function to GET Web API Data*/
const getWeather = async (baseUrl, zipCode, apiKey) => {
  const res = await fetch(
    `${baseUrl}?q=${zipCode}&appid=${apiKey}&units=metric`
  );
  try {
    // data equals to the result of fetch function
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content,
    }),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const updateWeather = async () => {
  const request = await fetch("/all");
  try {
    const Data = await request.json();
    console.log(Data);
    // update new entry values
    document.getElementById("date").innerHTML = "Date : " + Data.date;
    document.getElementById("temp").innerHTML =
      "Temp : " + Data.temp + " degree C";
    document.getElementById("content").innerHTML = "Feeling : " + Data.content;
  } catch (error) {
    console.log("error", error);
  }
};
