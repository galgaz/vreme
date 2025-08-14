import Napoved from "./Napoved.jsx"

function Prikazovalnik({ vremenskiPodatki }) {
    if (vremenskiPodatki.length === 0) {
        return (
            <>
                <title>Vreme</title>
                <main id="prikazovalnik">
                    <h3>
                        Poišči želeno mesto ali izberi trenutno lokacijo
                    </h3>
                </main>
            </>
        );
    }

    const trenutnoStanje = vremenskiPodatki.stanje;
    const napoved = vremenskiPodatki.napoved;

    return (
        <>
            <title>{`Vreme ${trenutnoStanje.name}`}</title>
            <main id="prikazovalnik">
                <div id="trenutnoVreme">
                    <h1 id="imeKraja">
                        {trenutnoStanje.name}, {trenutnoStanje.sys.country} {getFlagEmoji(trenutnoStanje.sys.country)}
                    </h1>
                    <div className="ikonaTempContainer">
                        <img id="vremeIkona" src={`https://openweathermap.org/img/wn/${trenutnoStanje.weather[0].icon}@2x.png`}></img>
                        <div className="tempContainer">
                            <h2>{Math.round(trenutnoStanje.main.temp)} °C</h2>
                            <h3 id="opisVremena">{trenutnoStanje.weather[0].description}</h3>
                        </div>
                    </div>
                    <div className="ostaleInfo">
                        <div className="pravokotnik">
                            <p>Vlažnost</p>
                            <h3>{trenutnoStanje.main.humidity} %</h3>
                        </div>
                        <div className="pravokotnik">
                            <p>Zračni tlak</p>
                            <h3>{trenutnoStanje.main.grnd_level} hPa</h3>
                        </div>
                        <div className="pravokotnik">
                            <img src="./veter-puscica.svg" style={{
                                transform: `rotate(${trenutnoStanje.wind.deg}deg)`,
                            }}></img>
                            <p>{trenutnoStanje.wind.speed} m/s</p>
                        </div>
                    </div>
                </div>
                <Napoved napovedPodatki={napoved}/>
            </main>
        </>
    );
}

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

export default Prikazovalnik;