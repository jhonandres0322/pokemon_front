<template>
  <div>
    <h1>
        <ListPokemon
          :pokemons="pokemons"
          title="Listado de Favoritos"
          @getFavorites="getFavorites"
        ></ListPokemon>
    </h1>
  </div>
</template>

<script>
import ListPokemon from '@/components/ListPokemon.vue';
export default {
    components: { ListPokemon },
    data() {
        return {
            pokemons: [],
        }
    },
    created() {
        this.getFavorites();
    },
    
    methods: {
      getFavorites() {
        this.axios.get( `${this.$apiBaseURL}/favorites` )
        .then((response) => {
          this.pokemons = response.data.pokemons.map( (pokemon) => {
            return pokemon.species;
          });
        })
        .catch((error) => {
          console.log(error);
        });
      },
    }
}
</script>

<style>

</style>