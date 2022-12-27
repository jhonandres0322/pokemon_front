<template>
  <div>
    <b-row class="mt-4 mb-2 mr-0" align-h="center">
      <b-col
        cols="12"
        md="5"
        lg="5"
      >
        <b-card border-variant="dark">
          <b-card-header class="text-center">
            <b-card-title>Registro de Usuario</b-card-title>
            <b-card-sub-title>
              Si ya tiene una cuenta. 
              <a 
                @click="goLogin()"
                style="cursor:pointer; color:#007bff"
              > Ingrese aquí</a> 
            </b-card-sub-title>
          </b-card-header>
          <b-card-body>
            <b-form @submit="registerUser" >
              <InputCustom
                v-model="name"
                typeValue="text"
                placeholder="Ingrese su nombre"
                icon="person-fill"
                :autofocus=true
                @inputValue="onInputName"
              />
              <InputCustom
                v-model="email"
                typeValue="email"
                placeholder="Ingrese su correo"
                icon="envelope-fill"
                @inputValue="onInputEmail"
              />
              <InputCustom
                v-model="password"
                typeValue="password"
                placeholder="Ingrese su contraseña"
                icon="key-fill"
                @inputValue="onInputPassword"
              />
              <div class="text-center">
                <b-button
                  type="submit"
                  variant="primary"
                >
                <b-icon icon="people-fill"></b-icon>
                  Registrar
                </b-button>
              </div>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import InputCustom from '@/components/InputCustom.vue';
import { mixinMakeToast } from '@/mixins/makeToast';
export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
        };
    },

    mixins: [mixinMakeToast ],

    methods: {
        goLogin() {
            this.$router.push("/");
        },

        onInputName( value ) {
          this.name = value;
        },

        onInputEmail( value ) {
          this.email = value;
        },

        onInputPassword( value ) {
          this.password = value;
        },

        registerUser(event) {
          event.preventDefault();
          this.axios.post(`${this.$apiBaseURL}/register`,{
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            console.log(response);
            this.makeToast('success', 'Registro de Usuario', response.data.msg );
          })
          .catch((error) => {
            this.makeToast('danger', 'Registro de Usuario', error.response.data.msg );
          });
        }
    },
    components: { InputCustom }
}
</script>

<style>

</style>