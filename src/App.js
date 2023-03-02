import React, {useState, useEffect} from 'react';
import { getAllPokemon, getPokemon, getPokemonCharacteristic } from './services/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import axios from 'axios';


function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [previousUrl, setPreviousUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=21&offset=0';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl); 
      setNextUrl(response.next); 
      setPreviousUrl(response.previous); 
      let pokemon = await loadingPokemon(response.results); 
      console.log(pokemon);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    if (!nextUrl) return;
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPreviousUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!previousUrl) return;
    setLoading(true);
    let data = await getAllPokemon(previousUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPreviousUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        //pokemonRecord.characteristic = await axios.get("https://pokeapi.co/api/v2/characteristic/" + pokemonRecord.id);
        return pokemonRecord;
      })
    );

    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);

  return (
    <>
      { loading ? <h1 className='loader-container'>Loading...</h1> : (
        <>
          <Navbar/>
          <div className="btn">
            <button hidden={!previousUrl} onClick={prev}>Prev</button>
            <button hidden={!nextUrl} onClick={next}>Next</button>
          </div>
          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon}/>
            })}
          </div>
          <div className="btn">
            <button hidden={!previousUrl} onClick={prev}>Prev</button>          
            <button hidden={!nextUrl} onClick={next}>Next</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
