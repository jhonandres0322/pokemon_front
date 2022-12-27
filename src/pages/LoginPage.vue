<template>
  <div >
    <b-row class="mr-0" style="height: 100%; width: 100%;">
      <b-col class="pl-4 mt-5 ml-3 mr-3" cols="4">
        <h2 class="ml-3">Inicio de Sesión</h2>
        <b-form @submit="login" class="mt-4">
            <InputCustom
              v-model="email"
              typeValue="email"
              placeholder="Correo"
              icon="envelope-fill"
              :autofocus=true
              @inputValue="onInputEmail"
            />
            <InputCustom
              v-model="password"
              typeValue="password"
              placeholder="Contraseña"
              icon="key"
              @inputValue="onInputPassword"
            />  
            <b-button
              class="mr-5"
              type="submit"
              variant="primary"
            >
              Iniciar Sesión
            </b-button>
          </b-form>
      </b-col>
      <b-col class="p-0" cols="7">
          <div>
            <b-img
              fluid
              center
              height="500"
              src="https://phantom-marca.unidadeditorial.es/2a6bb9293b020d388e4c1b1d3e640f1a/resize/1320/f/jpg/assets/multimedia/imagenes/2021/02/28/16145196328904.jpg"
            ></b-img>
          </div>
        </b-col>
    </b-row>
  </div>
</template>

<script>
  import InputCustom from '../components/InputCustom.vue';
  import { mixinMakeToast } from '../mixins/makeToast.js';
  export default {
    components: { InputCustom },
    data() {
      return {
        email: '',
        password: '',
      };
    },
    
    mixins: [ mixinMakeToast ],

    methods: {

      onInputEmail( value ) {
        this.email = value;
      },

      onInputPassword ( value ) {
        this.password = value;
      },

      login( event ) {
        event.preventDefault();
        this.axios.post(`${this.$apiBaseURL}/login`,{
          email: this.email,
          password: this.password
        })
        .then( (response) => {
          this.$store.commit('setToken', response.data.token);
          this.$store.commit('setUserLogin', response.data.user);
          this.$router.push('/home');
        })
        .catch( (error) => {
          console.log('error -->', error);
          this.makeToast('danger','Inicio Sesión','No se pudo ingresar');
        });
      },
    },
  }
</script>

<style>

</style>