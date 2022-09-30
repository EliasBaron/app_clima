window.addEventListener('load', ()=> {
  let lon;
  let lat;

  let temperaturaValor = document.getElementById('temperatura-valor');
  let temperaturaDescripcion = document.getElementById('temperatura-descripcion');

  let ubicacion = document.getElementById('ubicacion');
  let iconoAnimado = document.getElementById('icono-animado');

  let vientoVelocidad = document.getElementById('viento-velocidad');
  
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(posicion => {
      // console.log(posicion.coords.latitude)
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e9aac40c0b8a66447b89f809a94a06fa`
      
      //console.log(url);
      fetch(url)
        .then( response => { return response.json(); })
        .then( data => {
          // console.log(data.main.temp);
          let temp = Math.round(data.main.temp - 273)
          temperaturaValor.textContent = `${temp} °C`;

          let desc = data.weather[0].description;
          temperaturaDescripcion.textContent = desc.toUpperCase();
          
          ubicacion.textContent = data.name;
          console.log(data.weather);
          
          vientoVelocidad.textContent = `${data.wind.speed} m/s`;

          //para iconos animados
          switch(data.weather[0].main) {
            case 'Clear':
            iconoAnimado.src = 'animated/day.svg';
            console.log('LIMPIO')
            break;

            case 'Clouds':
            iconoAnimado.src = 'animated/cloudy-day-1.svg';
            console.log('NUBLADO')
            break;

            case 'Thunderstorm':
            iconoAnimado.src = 'animated/thunder.svg';
            console.log('TORMENTA')
            break;

            case 'Drizzle':
            iconoAnimado.src = 'animated/rainy-2.svg';
            console.log('LLOVIZNA')
            break;

            case 'Rain':
            iconoAnimado.src = 'animated/rainy-7.svg';
            console.log('LLUVIA')
            break;

            case 'Snow':
            iconoAnimado.src = 'animated/snowy-6.svg';
            console.log('NIEVE')
            break;

            case 'Atmosphere':
            iconoAnimado.src = 'animated/weather.svg';
            console.log('ATMOSFERA')
            break;

            case 'Default':
            iconoAnimado.src = 'animated/clody-day-1.svg';
            console.log('NUBES')
            break;
          }

        })
        .catch( err => {
          console.log(err);
        })
      
    })
  }
})