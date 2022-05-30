const app = document.querySelector('.weather-app')
const temp = document.querySelector('.temp')
const dateOutput = document.querySelector('.date')
const timeOutput = document.querySelector('.time')
const conditionOutput = document.querySelector('.condition')
let nameOutput = document.querySelector('.name')
const icon = document.querySelector('.icon')
const cloudOutput = document.querySelector('.cloudy')
const humidityOutput = document.querySelector('.humidity')
const windOutput = document.querySelector('.wind')
const form = document.querySelector('.locationInput')
const cities = document.querySelectorAll('.city')
const btn = document.querySelector('.submit')
const search = document.querySelector('.search')

//Default city when the page loads
let cityInput = "Dhaka"

// Add cities event to city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        // change from default to the clicked one
        cityInput = e.target.innerHTML;

        fetchWeatherData();
        app.style.opacity = "0"

    });


});
//Add submit event to form

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (search.value.length == 0) {
        alert('Please type you City Name')
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0"
    }
   

})


function dayOfTheWeek() {
    // const weekday= [
    //     "Sunday",
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday",
    //     "Thursday",
    //     "Friday",
    //     "Saturday"
    // ];
    // return weekday [new Date(`${day}/${month}/${year}`).getDay()]
    let day ;

        switch  (new Date().getDay()) {
        case 0: day = "Sunday";
            break;
        case 1: day = "Monday";
            break;
        case 2: day = "Tuesday"; break; case 3: day = "Wednesday"; break; case 4: day = "Thursday"; break; case 5: day = "Friday"; break; case 6: day = "Saturday";
    }
    return day
};

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=7fa5846d95c54247b0362925222905&q=${cityInput}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        

            temp.innerHTML = data.current.temp_c + '&#176'
            conditionOutput.innerHTML = data.current.condition.text;

            const dat = data.location.localtime;
            const y = parseInt(dat.substr(0, 4));
            const m = parseInt(dat.substr(5, 2));
            const d = parseInt(dat.substr(8, 2));
            const time = dat.substr(11);
            dateOutput.innerHTML = `${dayOfTheWeek()},${d}.${m}.${y}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;


            const iconId = data.current.condition.icon
          
               
        

          icon.setAttribute("src" ,`${iconId}`) 



          cloudOutput.innerHTML = data.current.cloud + "%";
          humidityOutput.innerHTML = data.current.humidity + "%";
          windOutput.innerHTML = data.current.wind_kph + " kp/h";
       

          //set default time and day
          let  timeOfDay;

          const code= data.current.condition.code
          // change to night on your city 
          if(data.current.is_day){
            timeOfDay ="day"
          }else{
            timeOfDay = "night"
          }

          if(code == 1000){
              app.style.backgroundImage =`url(./images/${timeOfDay}/clear.jpg)`;
              btn.style.background = "#e5ba92";

              if(timeOfDay=="night"){
                  btn.style.background = "#181e27"
              }
              console.log(timeOfDay ," 0 a"  , data.current.is_day ,)
          
          }
            // some thing cloudy wether  
          else if(
              code == 103   ||
              code == 106   ||
              code == 109   ||
              code == 130   ||
              code == 169   ||
              code == 1087  ||
              code == 1135  ||
              code == 1273  ||
              code == 1276  ||
              code == 1279  ||
              code == 1282   
          ){
              app.style.backgroundImage =`url(./images/${timeOfDay}/cloudy.jpg)`;
              btn.style.background = "#fa6d1b";
              if(timeOfDay=="night"){
                btn.style.background = "#181e27";
              }
              console.log(timeOfDay , '1b' ,data.current.is_day )
          }
          // some thing rainy wether  
          else if(
            code == 1063   ||
            code == 1069   ||
            code == 1072   ||
            code == 1150   ||
            code == 1153   ||
            code == 1180   ||
            code == 1183   ||
            code == 1186   ||
            code == 1189   ||
            code == 1192   ||
            code == 1195   ||
            code == 1204   ||
            code == 1207   ||
            code == 1240   ||
            code == 1243   ||
            code == 1246   ||
            code == 1249   ||
            code == 1252   
          ){
            app.style.backgroundImage =`url(./images/${timeOfDay}/rainy.jpg)`;
            btn.style.background = "#647d75";
            if(timeOfDay =="night"){
            
                btn.style.background = "#325c80";
            }
            console.log(timeOfDay ,'2c ' , data.current.is_day)

          }
          //and finnaly ... snow
          else{
            app.style.backgroundImage =`url(./images/${timeOfDay}/snowy.jpg)`;
            btn.style.background = "#4d72aa";
            if(timeOfDay =="night"){
                btn.style.background = "#1b1b1b";
            }
            console.log(timeOfDay ,"3d " , data.current.is_day)
          }

        app.style.opacity = "1"
        })

            // if the user type a city that dos't exist.
        //throw on alert
        


         .catch(()=>{
             alert('City not found, Please try agin')
             app.style.opacity = "1"
         })

        
    



}


     
fetchWeatherData()




