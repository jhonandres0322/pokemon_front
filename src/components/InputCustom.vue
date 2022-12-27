<template>
  <div>
    <b-input-group class="mb-3" label="Correo">
        <b-input-group-prepend is-text>
            <b-icon :icon="icon"></b-icon>
        </b-input-group-prepend>
            <b-form-input
                :type="typeValue"
                :value="value"
                :placeholder="placeholder"
                @input="onInput"
                autocomplete="off"
                trim
                required
                :autofocus="autofocus"
            ></b-form-input>
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
        onInput( value ) {
            this.$emit('inputValue', value);
        }
    }
}
</script>

<style>

</style>