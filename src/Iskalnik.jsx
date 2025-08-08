function Iskalnik({ onIskanjeSubmit, onGetLocation }) {
    return (
        <header id="iskalnik">
            <form method="post" onSubmit={onIskanjeSubmit} id="iskanje-form" >
                <input type="text" id="inputLokacija" className="siva-obroba" name="inputLokacija" placeholder="Ime mesta"></input>
                <button type="submit" id="submit-btn" className="siva-obroba">Išči</button>
            </form>
            <button type="button" onClick={onGetLocation} id="lokacija-gumb" className="siva-obroba" title="Izberi trenutno lokacijo">
                <img src="./lokacija-ikona.svg"></img>
            </button>
        </header>
    );
}

export default Iskalnik;