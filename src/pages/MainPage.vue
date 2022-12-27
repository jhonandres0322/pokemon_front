<template>
  <div>
    <h1>
        <ListPokemon
          :pokemons="pokemons"
          title="Listado de Pokemones"
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
        this.getPokemons();
    },

    methods: {
      getPokemons() {
        this.axios.get( `${this.$apiBaseURL}/pokemon` )
        .then((response) => {
          this.pokemons = response.data.pokemons;
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