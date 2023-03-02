//vai receber como parâmetro o endpoint
import axios from 'axios';

export async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
    })
}

export async function getPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
    })
}

export async function getPokemonCharacteristic(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(function(response) {
            if (response.status >= 200 && response.status < 300) {
              resolve(response.json())
            }
            else if (response.status === 404) {
                //reject({rere: 'ffff'})
                return{};
            }
        })
        //   .then(data => {
        //         resolve(data);
        //     })
    })
}

export async function getPo(url) {
    return new Promise( axios.get(url))
}