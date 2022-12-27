<template>
  <div>
    <b-navbar type="dark" variant="dark">
        <b-navbar-brand :to="
            $store.state.token
            ? '/home'
            : '/'
          ">
            PokeFav
        </b-navbar-brand>
        <div class="ml-auto"></div>
        <b-navbar-nav v-if="$store.state.token">
            <b-nav-item to="/home">Listado de Pokemones</b-nav-item>
            <b-nav-item to="/favorite">Listado de Favoritos</b-nav-item>
            <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>
                  {{ $store.state.userLogin.name }}
                </em>
              </template>
              <b-dropdown-item @click="goEditProfile">Editar Perfil</b-dropdown-item>
              <b-dropdown-item @click="logout">Cerrar Sesión</b-dropdown-item>
          </b-nav-item-dropdown>
          </b-navbar-nav>
        <b-navbar-nav v-else>
            <b-nav-item to="/register">Registro</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {

  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },

    goEditProfile() {
      this.$router.push('/edit-profile');
    },
  }
}
</script>

<style>

</style>