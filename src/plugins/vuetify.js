import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                // background is lavender blush
                background: "#F7EDF0",
                // primary is dark purple
                primary: "#2e294e",
                // secondary is purple Pomp and Power
                secondary: "#966B9D",
                honeydew: "#E1EFE6",
                tearose: "#F4CBC6",
            },
        },
    },
});

export default vuetify;
