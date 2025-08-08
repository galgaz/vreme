import { useState } from 'react'
import Prikazovalnik from "./Prikazovalnik.jsx"
import Iskalnik from "./Iskalnik.jsx"
import Spodaj from "./Spodaj.jsx"

const API_KEY = "8c827e7df23dd2fafed2ae828d298731";

function App() {
  const [vreme, setVreme] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    const imeKraja = formJson.inputLokacija;
    // console.log(formJson);
    const koordinate = await getKoordinate(imeKraja);
    const novoVreme = await getVreme(koordinate);
    setVreme(novoVreme);
  }

  const [userLocation, setUserLocation] = useState(null);
  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const koordinate = {
            lat: latitude,
            lon: longitude
          }
          const novoVreme = await getVreme(koordinate);
          setVreme(novoVreme);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  
  let cas = 0;
  if(Object.keys(vreme).length != 0){
    cas = UTCToLocalTime(vreme.dt);
  }
  return (
    <>
      <Iskalnik onIskanjeSubmit={handleSubmit} onGetLocation={getUserLocation} />
      <Prikazovalnik vremenskiPodatki={vreme} />
      <Spodaj casPridobitve={cas}/>
    </>
  );
}

async function getKoordinate(imeKraja) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${imeKraja}&limit=5&appid=${API_KEY}`;
  try {
    const res = await fetch(url);
    const koordinate = await res.json();
    // console.log(koordinate);
    return {
      lat: koordinate[0].lat,
      lon: koordinate[0].lon
    };
  } catch (err) {
    console.error(err);
  }
}

async function getVreme(koordinate) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${koordinate.lat}&lon=${koordinate.lon}&appid=${API_KEY}&units=metric&lang=sl`;
  try {
    const res = await fetch(url);
    const novoVreme = await res.json();
    // console.log(novoVreme);
    return novoVreme;
  } catch (err) {
    console.error(err);
  }
}

function UTCToLocalTime(UTCTime){
    const podatkiCasUTC = new Date(UTCTime * 1000);
    const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: '2-digit',
        minute: '2-digit',
    });
    const podatkiCasString = formatter.format(podatkiCasUTC);
    return podatkiCasString;
}

export default App;
