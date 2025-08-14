import {utcStrToLocalTime} from "./utcToLocalTime.jsx";

export default function Napoved({napovedPodatki}){
    return(
        <>
            <h4>Napoved za naslednjih 5 dni:</h4>
            <ul id="napoved-list">
                {
                napovedPodatki.list.map(function(item, i){
                    return (
                        <li key={i}>
                            <p>
                                <strong>{utcStrToLocalTime(item.dt_txt)}</strong>
                            </p>
                            <div className="ikona-text">
                                <img src="./termometer.svg"></img>
                                <p>{Math.round(item.main.temp)} °C</p>
                            </div>
                            <div>
                                <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}></img>
                                <p>{item.weather[0].description}</p>
                            </div>
                            <div className="ikona-text">
                                <img src="./veter-puscica.svg" style={{
                                    transform: `rotate(${item.wind.deg}deg)`,
                                }}></img>
                                <p>{item.wind.speed} m/s</p>
                            </div>
                            <div className="ikona-text">
                                <img src="./kapljica.svg"></img>
                                <p>{item.main.humidity} %</p>
                            </div>
                            <div className="ikona-text">
                                <img src="./tlak.svg"></img>
                                <p>{item.main.pressure} hPa</p>
                            </div>
                        </li>
                    )
                })
                }
            </ul>
        </>
    );
}