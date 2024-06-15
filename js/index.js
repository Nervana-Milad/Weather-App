// const apiKey = "3cbaf9d3e1ec4eeba4c114705241406";
// const day = 3;
// const req = new XMLHttpRequest();
// const searchInput = document.querySelector("#search");
// searchInput.addEventListener("input", function (e) {
//   getWeather(e.target.value);
// });

// const days = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// let result;
// async function getWeather(c) {
//   const req = await fetch(
//     `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${c}&days=${day}`
//   );
//   console.log(req);
//   if (req.ok) {
//     result = await req.json();
//     // let date = new Date(result.current.last_updated);
//     // console.log(result.forecast);
//     displayCurrentWeather(result.location, result.current);
//     displayNext2Days(result.forecast.forecastday);
//   }
// }

// function displayCurrentWeather(location, currentDay) {
//   let date = new Date(currentDay.last_updated);
//   let current = `<div class="card h-100">
//                   <div
//                     class="card-header d-flex justify-content-between align-items-center"
//                   >
//                     <h5>${days[date.getDay()]}</h5>
//                     <h6>${date.getDate()}/${
//     date.getMonth() + 1
//   }/${date.getFullYear()}</h6>
//                   </div>
//                   <div class="card-body text-center">
//                     <h4 class="card-title">${location.name}</h4>
//                     <h3 class="card-text">${
//                       currentDay.temp_c
//                     } C<sup>o</sup> </h3>
//                     <img src="https:${currentDay.condition.icon}">
//                     <p class="text-body-secondary">${
//                       currentDay.condition.text
//                     }</p>
//                   </div>
//                   <div class="card-footer d-flex justify-content-between">
//                     <span>
//                       <img
//                         src="/img/icon-umberella.png"
//                         class="img-fluid"
//                         alt=""
//                       />
//                       20%
//                     </span>
//                     <span>
//                       <img
//                         src="/img/icon-wind.png"
//                         class="img-fluid"
//                         alt=""
//                       />
//                       18Km/h
//                     </span>
//                     <span>
//                       <img
//                         src="/img/icon-compass.png"
//                         class="img-fluid"
//                         alt=""
//                       />
//                       East
//                     </span>
//                   </div>
//                 </div>`;
//   document.querySelector(".weather").innerHTML = current;
// }

// function displayNext2Days(forecastDay) {
//   let forecast = "";
//   let currentDate = new Date(result.current.last_updated);
//   for (let i = 0; i < forecastDay.length; i++) {
//     let date = new Date(forecastDay[i].date);

//     if (date.getDay() == currentDate.getDay()) {
//       continue;
//     } else {
//       console.log(forecastDay[i]);
//       forecast += `
//                   <div class="col-sm-12 col-md-6">
//           <div class="card h-100">
//             <div class="card-header d-flex justify-content-between align-items-center">
//               <h5>${days[date.getDay()]}</h5>
//               <h6>${date.getDate()}/${
//         date.getMonth() + 1
//       }/${date.getFullYear()}</h6>
//             </div>
//             <div class="card-body text-center">
//               <h4 class="card-title">${result.location.name}</h4>
//               <h3 class="card-text">${
//                 forecastDay[i].day.maxtemp_c
//               } C<sup>o</sup></h3>
//               <img src="https:${
//                 forecastDay[i].day.condition.icon
//               }" alt="Weather icon">
//               <p class="text-body-secondary">${
//                 forecastDay[i].day.condition.text
//               }</p>
//             </div>
//             <div class="card-footer d-flex justify-content-between">
//               <span>
//                 <img src="/img/icon-umberella.png" class="img-fluid" alt="Umbrella icon" />
//                 20%
//               </span>
//               <span>
//                 <img src="/img/icon-wind.png" class="img-fluid" alt="Wind icon" />
//                 18Km/h
//               </span>
//               <span>
//                 <img src="/img/icon-compass.png" class="img-fluid" alt="Compass icon" />
//                 East
//               </span>
//             </div>
//           </div>
//         </div>
//         `;
//     }
//   }
//   document.querySelector(".nextdays").innerHTML = forecast;
// }

const apiKey = "3cbaf9d3e1ec4eeba4c114705241406";
const day = 3;
const searchInput = document.querySelector("#search");
const locateMeButton = document.querySelector("#locate-me");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let result;

searchInput.addEventListener("input", function (e) {
  getWeather(e.target.value);
});

locateMeButton.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCoordinates(lat, lon);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

async function getWeather(c) {
  const req = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${c}&days=${day}`
  );
  console.log(req);
  if (req.ok) {
    result = await req.json();
    displayCurrentWeather(result.location, result.current);
    displayNext2Days(result.forecast.forecastday);
  }
}

async function getWeatherByCoordinates(lat, lon) {
  const req = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=${day}`
  );
  console.log(req);
  if (req.ok) {
    result = await req.json();
    displayCurrentWeather(result.location, result.current);
    displayNext2Days(result.forecast.forecastday);
  }
}

function displayCurrentWeather(location, currentDay) {
  let date = new Date(currentDay.last_updated);
  let current = `<div class="card h-100">
                      <div
                        class="card-header d-flex justify-content-between align-items-center"
                      >
                        <h5>${days[date.getDay()]}</h5>
                        <h6>${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}</h6>
                      </div>
                      <div class="card-body text-center">
                        <h4 class="card-title">${location.name}</h4>
                        <h3 class="card-text">${
                          currentDay.temp_c
                        } C<sup>o</sup> </h3>
                        <img src="https:${currentDay.condition.icon}">
                        <p class="text-body-secondary">${
                          currentDay.condition.text
                        }</p>
                      </div>
                      <div class="card-footer d-flex justify-content-between">
                        <span>
                          <img
                            src="img/icon-umberella.png"
                            class="img-fluid"
                            alt="Umbrella icon
                          />
                          20%
                        </span>
                        <span>
                          <img
                            src="img/icon-wind.png"
                            class="img-fluid"
                            alt="wind icon
                          />
                          18Km/h
                        </span>
                        <span>
                          <img
                            src="img/icon-compass.png"
                            class="img-fluid"
                            alt="compass icon
                          />
                          East
                        </span>
                      </div>
                    </div>`;
  document.querySelector(".weather").innerHTML = current;
}

function displayNext2Days(forecastDay) {
  let forecast = "";
  let currentDate = new Date(result.current.last_updated);
  for (let i = 0; i < forecastDay.length; i++) {
    let date = new Date(forecastDay[i].date);

    if (date.getDay() == currentDate.getDay()) {
      continue;
    } else {
      console.log(forecastDay[i]);
      forecast += `
                      <div class="col-sm-12 col-md-6">
              <div class="card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5>${days[date.getDay()]}</h5>
                  <h6>${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}</h6>
                </div>
                <div class="card-body text-center">
                  <h4 class="card-title">${result.location.name}</h4>
                  <h3 class="card-text">${
                    forecastDay[i].day.maxtemp_c
                  } C<sup>o</sup></h3>
                  <img src="https:${
                    forecastDay[i].day.condition.icon
                  }" alt="Weather icon">
                  <p class="text-body-secondary">${
                    forecastDay[i].day.condition.text
                  }</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                  <span>
                    <img src="img/icon-umberella.png" class="img-fluid" alt="Umbrella icon" />
                    20%
                  </span>
                  <span>
                    <img src="img/icon-wind.png" class="img-fluid" alt="Wind icon" />
                    18Km/h
                  </span>
                  <span>
                    <img src="img/icon-compass.png" class="img-fluid" alt="Compass icon" />
                    East
                  </span>
                </div>
              </div>
            </div>
            `;
    }
  }
  document.querySelector(".nextdays").innerHTML = forecast;
}
