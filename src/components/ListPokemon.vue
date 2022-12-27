<template>
  <b-overlay :show="isLoading">
    <div class="overflow-auto">
      <b-card class="mt-4 w-75 mx-auto">
        <b-card-header>
          <h3> {{ title }}</h3>
        </b-card-header>
        <b-card-body>
          <b-row>
            <b-col cols="12">
              <b-form-input
                v-model="filter"
                placeholder="Buscar..."
              />
              <b-table
                id="my-table"
                :items="pokemons"
                :fields="fields"
                :filter="filter"
                :per-page="perPage"
                :current-page="currentPage"
                bordered
              >
                <template v-slot:cell(name)="row">
                  <p>
                    {{ capitalizeWord(row.item.name) }}
                  </p>
                </template>
                <template v-slot:cell(action)="row">
                  <b-button class="btn btn-sm" variant="primary" @click="viewPokemon(row.item)">
                    <b-icon  icon="eye-fill" />
                  </b-button>
                </template>
              </b-table>
              <b-card-footer >
                <b-pagination
                  class="d-flex justify-content-center"
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="my-table"
                />
              </b-card-footer>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
      <b-modal
        v-model="showModalPokemon"
        centered
        :title="'Detalle de ' + capitalizeWord(pokemonSelected.name ?? '') "
        no-close-on-backdrop
        no-close-on-esc
      >
        <PokemonItem
          :pokemon="pokemonSelected"
          @validateFavorite="validateFavorite"
        />
        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button
              size="sm"
              :variant="isFavorite ? 'danger' : 'success'"
              @click="isFavorite ? deleteFavorite() : addFavorite()"
            >
              {{ isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </b-overlay>
</template>

<script>
  import PokemonItem from '@/components/PokemonItem.vue';
  import { mixinMakeToast } from '@/mixins/makeToast';
  import { mixinCapitalizeWord } from '../mixins/capitalizeWord.js';
  export default {
    components: { PokemonItem },

    props: {
      pokemons: {
        type: Array,
        default: () => [],
      },
      title: {
        type: String,
        default: '',
      }
    },
    data() {
      
      return {
        pokemonSelected: {},
        showModalPokemon: false,
        isLoading: true,
        // INFO TABLE
        perPage: 5,
        filter:'',
        currentPage: 1,
        isFavorite: false,
        fields: [
          { key: 'name', label:'Nombre' },
          { key: 'action', label:'Acción', class:'small-col text-center'}
        ]
      }
    },

    watch: {
      pokemons() {
        this.isLoading = false;
      },
    },

    computed: {
      rows () {
          return this.pokemons.length
      },
      idPokemonSelected () {
          return this.pokemonSelected.url.split('/')[6];
      }
    },

    mixins: [ mixinCapitalizeWord, mixinMakeToast ],
    
    methods: {
      
      viewPokemon( pokemon ) {
        this.pokemonSelected = pokemon;
        this.showModalPokemon = true;
      },

      validateFavorite(value) {
        this.isFavorite = value;
      },

      addFavorite() {
        this.axios.post( `${this.$apiBaseURL}/favorites`, {
            id: this.idPokemonSelected
        })
        .then((response) => {
          console.log('response -->', response);
          this.makeToast('success', 'Gestionar Favoritos', response.data.msg);
          this.showModalPokemon = false;
          this.$emit('getFavorites');
        })
        .catch((error) => {
            console.log(error);
        });
      },

      deleteFavorite() {
        this.axios.delete( `${this.$apiBaseURL}/favorites/${this.idPokemonSelected}` )
        .then((response) => {
          console.log('response -->', response);
          this.makeToast('success', 'Gestionar Favoritos', response.data.msg );
          this.showModalPokemon = false;
          this.$emit('getFavorites');
        })
        .catch((error) => {
            console.log(error);
        });
      }
    },
  }
</script>

<style>

</style>