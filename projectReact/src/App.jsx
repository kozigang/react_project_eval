import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Formulary = ({ darkMode, setDarkMode }) => {
  const [data, setData] = useState(null);
  const [ville, setVille] = useState("");
  const [inputVille, setInputVille] = useState("");
  const [pays, setPays] = useState(""); 
  const [temperature, setTemperature] = useState(null);
  const [condition, setCondition] = useState("Nuageux");
  const [loading, setLoading] = useState(false);

  const [geolocation, setGeolocation] = useState(null);

  const weatherIcons = {
  Soleil: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" tyle={{ width: '5rem', height: '5rem' }} strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>

  ),
  Nuage: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: '5rem', height: '5rem' }} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
    </svg>
  )
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setVille(inputVille);
    setLoading(true);
    console.log("Recherche :", ville);
    try{
      const response = await fetch(`https://dummyjson.com/users/search?q=${inputVille}&delay=1000`);
    const result = await response.json();

    console.log(result);
    setData(result);

    const temp = Math.floor(Math.random() * (35 - 10 + 1)) + 10;
    setTemperature(temp);

    const isSunny = Math.random() < 0.5;
    setCondition(isSunny ? "Ensoleillé" : "Nuageux");

    setPays(result?.users?.[0]?.address?.city || "France");

    localStorage.setItem("weatherData", JSON.stringify({
      ville: inputVille,
      pays: result?.users?.[0]?.address?.city || "France",
      temperature: temp,
      condition: isSunny ? "Ensoleillé" : "Nuageux"
    }));
  } catch (error) {
      alert("Mais où est passé ta connexion internet ?");
  } finally {
    setLoading(false);
  }
};

  const weatherAdvice = {
    "Ensoleillé": "Regarde comme il fait beau, dehors c'est l'heure pour aller jouer ! Il faut sortir le short et les petites chemises",
    "Nuageux": "Le ciel nous tombe sur la tête ! Met un pull et des bottes"
  };



  return (
    <div className={"data-container " + (darkMode ? "dark" : "")}>
      <form onSubmit={handleSubmit}>
        <div className="search-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '1.5em', height: '1.5em', color: 'grey', cursor: 'pointer' }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="text"
            value={inputVille}
            onChange={(e) => setInputVille(e.target.value)}
            placeholder="Rechercher"
          />
          {loading && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{
              width: '1.5em',
              height: '1.5em',
              color: 'grey'
            }} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>)}

          
        </div>
      </form>

      <h3>{data ? ville : "Nantes"} • {data ? pays : "France"}</h3>
      <div className="weather-container">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2 style={{ margin: 0 }}>{data ? `${temperature}°C` : "20°C"}</h2>
            <h3 style={{ margin: 0 }}>{condition}</h3>
          </div>

          <div className="icons">
            {condition === "Ensoleillé" ? weatherIcons.Soleil : weatherIcons.Nuage}
          </div>
        </div>
      </div>

      <div className='advice-container'>
        <p>{condition === "Ensoleillé" ? weatherAdvice["Ensoleillé"] : weatherAdvice["Nuageux"]}</p>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={"app-container " + (darkMode ? "dark" : "")}>
      <div className="theme-switch">
        <p>Thème</p>
        <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
      </div>
      <Formulary darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App
