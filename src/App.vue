<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: "App",
    };
</script>

<style scoped>
    @import "../src/assets/sass/style.scss";
    .v-application {
        background-color: #ffc2d1;
    }
</style>
