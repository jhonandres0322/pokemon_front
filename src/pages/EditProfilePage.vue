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
            <b-card-title>Editar Perfil de Usuario</b-card-title>
          </b-card-header>
          <b-card-body>
            <b-form @submit="editUser" >
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
              <InputCustom
                v-model="address"
                typeValue="text"
                placeholder="Ingrese su dirección"
                icon="house-fill"
                @inputValue="onInputAddress"
              />
              <InputDateCustom
                v-model="birthday"
                typeValue="text"
                placeholder="Ingrese su fecha de nacimiento"
                icon="calendar-date-fill"
                @inputValue="onInputBirthday"
              />
              <InputCustom
                v-model="city"
                typeValue="text"
                placeholder="Ingrese su ciudad"
                icon="geo-alt-fill"
                @inputValue="onInputCty"
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
import InputDateCustom from '../components/InputDateCustom.vue';
  export default {
      data() {
          return {
              name: "",
              email: "",
              password: "",
              address: "",
              birthday: "",
              city: ""
          };
      },
  
      mixins: [mixinMakeToast ],

      created() {
          this.getUser();
      },
  
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

          onInputAddress( value ) {
            this.address = value;
          },

          onInputCty( value ) {
            this.city = value;
          },

          onInputBirthday( value ) {
            this.birthday = value;
          },

          getUser() {
            this.axios.get(`${this.$apiBaseURL}/user`)
            .then( response => {
              console.log(response.data);
              this.name = response.data.user.name;
              this.email = response.data.user.email;
              this.address = response.data.user.address;
              this.birthday = response.data.user.birthday;
              this.city = response.data.user.city;
            })
            .catch( error => {
              console.log(error);
            });
          },

          editUser(event) {
            event.preventDefault();
            this.axios.post(`${this.$apiBaseURL}/user/edit`,{
              name: this.name,
              email: this.email,
              password: this.password,
              address: this.address,
              birthday: this.birthday,
              city: this.city
            })
            .then((response) => {
              console.log(response);
              this.makeToast('success', 'Edición de Perfil', response.data.msg );
            })
            .catch((error) => {
              this.makeToast('danger', 'Edición de Perfil', error.response.data.msg );
            });
          }
      },
      components: { InputCustom, InputDateCustom }
  }
  </script>

<style>

</style>