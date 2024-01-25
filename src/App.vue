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
        background-color: #d0cadb;
    }
</style>
