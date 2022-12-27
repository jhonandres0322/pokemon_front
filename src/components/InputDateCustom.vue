<template>
    <div>
        <b-input-group class="mb-3" label="Correo">
        <b-input-group-prepend is-text>
            <b-icon :icon="icon"></b-icon>
        </b-input-group-prepend>
            <b-form-datepicker
                :value="value"
                :placeholder="placeholder"
                label-no-date-selected="No hay fecha seleccionada"
                label-calendar="Calendario"
                label-selected="Seleccionado"
                label-close-button="Cerrar"
                label-current-month="Mes actual"
                label-current-year="Año actual"
                label-help="Presione la tecla de flecha hacia abajo o hacia arriba para cambiar el valor."
                label-nav="Navegación"
                label-next-decade="Próxima década"
                label-next-month="Próximo mes"
                label-next-year="Próximo año"
                label-today="Hoy"
                label-today-button="Ir a hoy"
                @input="onInput"
                autocomplete="off"
                trim
                required
                :autofocus="autofocus"
            ></b-form-datepicker>
    </b-input-group>
  </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        typeValue: {
            type: String,
            default: ''
        },
        placeholder:{
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    },

    methods: {
        onInput( value = '' ) {
            console.log(value);
            let dateStr = value.concat('T05:00:00.000Z');
            const now = new Date();
            const date = new Date(dateStr);
            let difference = now.getTime() - date.getTime();
            let years = difference/(1000 * 3600 * 24 * 365);
            if (years < 18) {
                this.$bvToast.toast('Debe ser mayor de edad', {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                });
                return;
            }
            this.$emit('inputValue', value);
        }
    }
}
</script>

<style>

</style>