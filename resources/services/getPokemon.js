const getPokemon = async(pokeId) => {
    try{
        const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        const result = await pokemons.json();
        return result;
    }catch(error){
        console.log(error);
        return null;
    }
}
export default getPokemon;