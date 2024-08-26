import React, { useState, useEffect } from 'react';
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
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=21000&offset=0';
  const [searchItem, setSearchItem] = useState('')
  const [filteredItens, setFilteredItens] = useState('');


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
        pokemonRecord.characteristic = await getPokemonCharacteristic("https://pokeapi.co/api/v2/characteristic/" + pokemonRecord.id);
        return pokemonRecord;
      })
    );

    setPokemonData(_pokemonData);
    setFilteredItens(_pokemonData);
  };
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const itensResult = filteredItens.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.types.map(item => item.type.name.toLowerCase()).includes(searchTerm.toLowerCase())
    );

    setPokemonData(itensResult);
  }

  return (
    <>
      {loading ? <h1 className='loader-container'>Loading...</h1> : (
        <>
          <Navbar />
          <div className="btn">
            <button hidden={!previousUrl} onClick={prev}>Prev</button>
            <button hidden={!nextUrl} onClick={next}>Next</button>
          </div>

          <div>
            <input
            autoFocus
              type="text"
              placeholder="Search by NAME or TYPE"
              value={searchItem}
              onChange={handleInputChange}
              style={{
                border: "8px solid #ccc",
                padding: "10px",
                borderRadius: "20px",
                fontSize: "22px",
                display: "block",
                margin: "-35px auto 15px",
                width: "50%",
              }}
              />
          </div>

          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />
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
