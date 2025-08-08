function Spodaj({ casPridobitve }){
    function Cas(){
        if(casPridobitve != 0){
            return(
                <p>Podatki pridobljeni ob {casPridobitve} iz OpenWeatherMap |&nbsp;</p>
            );
        }
    }
    
    return(
        <footer>
            <Cas />
            <a id="github-link" href="https://github.com/galgaz/vreme">Github</a>
        </footer>
    );
}

export default Spodaj;