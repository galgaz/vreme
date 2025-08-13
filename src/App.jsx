import { useState } from 'react'
import { utcIntToLocalTime } from './utcToLocalTime.jsx'
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

  function getVremeUserLocation() {
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
    cas = utcIntToLocalTime(vreme.stanje.dt);
  }
  return (
    <>
      <Iskalnik onIskanjeSubmit={handleSubmit} onGetLocation={getVremeUserLocation} />
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
  const urlStanje = `https://api.openweathermap.org/data/2.5/weather?lat=${koordinate.lat}&lon=${koordinate.lon}&appid=${API_KEY}&units=metric&lang=sl`;
  const urlNapoved = `https://api.openweathermap.org/data/2.5/forecast?lat=${koordinate.lat}&lon=${koordinate.lon}&appid=${API_KEY}&units=metric&lang=sl`;
  try {
    const res = await fetch(urlStanje);
    const novoStanje = await res.json();
    // console.log(novoVreme);
    // return novoVreme;
    try {
      const res = await fetch(urlNapoved);
      const novaNapoved = await res.json();

      const podatki = {
        stanje: novoStanje,
        napoved: novaNapoved
      };
      console.log(podatki);
      return podatki;

    } catch (err) {
      console.error(err);
    }

  } catch (err) {
    console.error(err);
  }
}

export default App;
