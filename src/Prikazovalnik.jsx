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

    return (
        <>
            <title>{`Vreme ${vremenskiPodatki.name}`}</title>
            <main id="prikazovalnik">
                <h1 id="imeKraja">
                    {vremenskiPodatki.name}, {vremenskiPodatki.sys.country} {getFlagEmoji(vremenskiPodatki.sys.country)}
                </h1>
                <div className="ikonaTempContainer">
                    <img id="vremeIkona" src={`https://openweathermap.org/img/wn/${vremenskiPodatki.weather[0].icon}@2x.png`}></img>
                    <div className="tempContainer">
                        <h2>{Math.round(vremenskiPodatki.main.temp)} °C</h2>
                        <h3 id="opisVremena">{vremenskiPodatki.weather[0].description}</h3>
                    </div>
                </div>
                <div className="ostaleInfo">
                    <div className="pravokotnik">
                        <p>Vlažnost</p>
                        <h3>{vremenskiPodatki.main.humidity} %</h3>
                    </div>
                    <div className="pravokotnik">
                        <p>Zračni tlak</p>
                        <h3>{vremenskiPodatki.main.grnd_level} hPa</h3>
                    </div>
                    <div className="pravokotnik">
                        <img src="./veter-puscica.svg" style={{
                            transform: `rotate(${vremenskiPodatki.wind.deg}deg)`,
                            color: "white"
                        }}></img>
                        <p>{vremenskiPodatki.wind.speed} m/s</p>
                    </div>
                </div>
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