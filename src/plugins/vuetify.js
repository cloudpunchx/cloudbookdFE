import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                // background is white
                background: "#ffffff",
                // primary is dark purple
                primary: "#2e294e",
                // secondary is purple-white
                secondary: "#ffffff",
                // secondary: "#f8f7ff",
            },
        },
    },
});

export default vuetify;
