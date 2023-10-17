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

<!-- HAVENT DONE CSS YET -->
<style scoped>
    @import "../src/assets/sass/style.scss";
    .v-application {
        background-color: #11161d;
    }
</style>
