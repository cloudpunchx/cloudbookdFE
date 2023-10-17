import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                // background is light pink
                background: "#ffc2d1",
                // primary is red
                primary: "#DD1C1A",
                // secondary is purple-white
                secondary: "#f8f7ff",
                // accent is purple
                accent: "#A2A3BB",
                error: "#b71c1c",
            },
        },
    },
});

export default vuetify;
