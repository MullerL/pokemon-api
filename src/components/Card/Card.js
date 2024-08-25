import pokemonTypeColors from '../../helpers/pokemonTypeColors';
import React from 'react';
import './style.css';

function Card({ pokemon }) {
        return (
            <div id="scrollableDiv" className="Card">
                    <div className="Card__img">
                        <img src={pokemon.sprites.other.showdown.front_default ?
                            pokemon.sprites.other.showdown.front_default : pokemon.sprites.other.home.front_default} alt="Ops! Image not available" />
                    </div>
                    <div className="Card__name">
                        {pokemon.id}
                    </div>
                    <div className="Card__name">
                        {pokemon.name}
                    </div>
                    <div className="Card__types">
                        {
                            pokemon.types.map(type => {
                                return (
                                    <div className="Card__type" style={{ backgroundColor: pokemonTypeColors[type.type.name] }}>
                                        {type.type.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="Card__info">
                        {/* <div className="Card__data">
                            <p className="title">Characteristic</p>
                            <p>{pokemon.characteristic.toString().length > 0 ? pokemon.characteristic.descriptions[7].description : 'gggg'  }</p>
                        </div> */}
                        <div className="Card__data">
                            <p className="title">Weight</p>
                            <p>{pokemon.weight}</p>
                        </div>
                        <div className="Card__data">
                            <p className="title">Height</p>
                            <p>{pokemon.height}</p>
                        </div>
                        <div className="Card__data">
                            <p className="title">Ability</p>
                            <p className="ability">{pokemon.abilities[0].ability.name}</p>
                        </div>
                        <div className="Card__data">
                            <p className="title">Characteristic</p>
                            <p className="ability">{pokemon.characteristic != 'Not Found' ?
                            pokemon.characteristic.descriptions[7].description : 'Not available'}</p>
                        </div>
                    </div>
            </div>
        );
}

export default Card;
