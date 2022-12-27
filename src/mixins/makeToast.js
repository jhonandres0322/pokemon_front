export const mixinMakeToast = {
    methods: {
        makeToast( variant, title, content ) {
            this.$bvToast.toast(content, {
                title: title,
                variant: variant,
                solid: true
            } );
        }
    }
}