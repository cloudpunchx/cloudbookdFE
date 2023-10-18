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
    .v-application {
        background-color: #ffffff;
        background-image: url("./assets/boobooks.png");
        background-size: repeat;
        background-repeat: no-repeat;
    }
</style>
