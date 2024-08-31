import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
	const [allPokemon, setAllPokemon] = useState([]);
	const [dataApi, setDataApi] = useState({});

	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

	const fetchPokemon = async () => {
		const { data } = await axios.get(apiUrl);
		const results = data.results;

		setDataApi({
			next: data.next,
			prev: data.previous ? data.previous : '',
		});

		const pokemonData = results.map((pokemon) => {
			const index = pokemon.url.split('/')[pokemon.url.split('/').length - 2];
			return { name: pokemon.name, index };
		});

		setAllPokemon(pokemonData);
	};

	const nextDataHandler = () => {
		apiUrl = dataApi.next;
		fetchPokemon();
	};

	const prevDataHandler = () => {
		apiUrl = dataApi.prev;

		fetchPokemon();
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	return (
		<div className='app'>
			<div className='container'>
				<h2>Pokemons</h2>

				<ul className='pokemon_list'>
					{allPokemon.map((el, idx) => (
						<li className='pokemon_card' key={idx}>
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${el.index}.png`}
								alt='pokemon-image'
							/>
							{el.name}
						</li>
					))}
				</ul>

				<button onClick={prevDataHandler}>Prev</button>
				<button onClick={nextDataHandler}>Next</button>
			</div>
		</div>
	);
}

export default App;
