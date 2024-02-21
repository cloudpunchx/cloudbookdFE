import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                // background is deep purple
                background: "#13022c",
                // primary is dark purple
                primary: "#5e3b92",
                // secondary is purple Pomp and Power
                secondary: "#966B9D",
                honeydew: "#E1EFE6",
                tearose: "#F4CBC6",
                lavender: "#C9A2C7",
                lavenderBlush: "#F7EDF0",
            },
        },
    },
});

export default vuetify;
