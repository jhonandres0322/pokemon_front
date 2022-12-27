<template>
    <div>
        <b-overlay :show="isLoading">
            <b-card 
                :img-src="image" 
                img-alt="Card image" 
                img-left
                img-height="200px"
                img-width="150px"
                class="mb-3"
            >
                <b-card-text>
                    <b-row>
                        <b-col>
                            <h2>
                                {{ capitalizeWord(pokemon.name ?? '') }}
                            </h2>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <h5>
                                Tipo
                            </h5>
                            <div v-for="(item, index) in types" :key="index" >
                                {{ index + 1 }} .{{ capitalizeWord( item.type.name )  }}  
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <h5>
                                Estadisticas
                            </h5>
                            <b> Altura: </b> {{ height }} decimetros <br>
                            <b> Peso: </b> {{ weight }} hectogramos
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col>
                            <h5>
                                Habilidades
                            </h5>
                            <div v-for="(item, index) in abilities" :key="index" >
                                {{ index + 1 }} .{{ capitalizeWord( item.ability.name )  }}  
                            </div>
                        </b-col>
                    </b-row>
                </b-card-text>
            </b-card>
        </b-overlay>

    </div>
</template>


<script>
    import { mixinCapitalizeWord } from '../mixins/capitalizeWord.js';
    import { mixinMakeToast } from '@/mixins/makeToast';
    export default {

        data() {
            return {
                image: '',
                types: [],
                weight: '',
                height: '',
                abilities: [],
                isLoading: true
            }
        },

        props: {
            pokemon: {
                type: Object,
                required: true
            }
        },

        mixins: [ mixinCapitalizeWord, mixinMakeToast ],

        created () {
            this.getPokemon();
            this.makeToast('success', 'Información Pokemon', 'Se ha cargado la información del pokemon');
        },
 
        methods: {
            getPokemon() {
                let id = this.pokemon.url.split('/')[6];
                this.axios.get( `${this.$apiBaseURL}/pokemon/${id} `)
                .then((response) => {
                    let resp = response.data;
                    this.image = resp.pokemon.sprites.front_default;
                    this.types = resp.pokemon.types;
                    this.abilities = resp.pokemon.abilities;
                    this.weight = resp.pokemon.weight;
                    this.height = resp.pokemon.height;
                    this.isLoading = false;
                    this.$emit('validateFavorite', resp.isFavorite);
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