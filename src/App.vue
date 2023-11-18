<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
        <PageFooter />
    </v-app>
</template>

<script>
    import PageFooter from "./components/PageFooter.vue";

    export default {
        name: "App",
        components: {
            PageFooter,
        },
    };
</script>

<style scoped>
    @import "../src/assets/sass/style.scss";
    .v-application {
        background-color: #f7edf0;
        background-image: url("./assets/ghostBackground.png");
        background-size: 50% auto;
        background-repeat: repeat;
    }
</style>
