<template>
    <v-app-bar color="background" flat class="custom-app-bar">
        <v-container>
            <!-- Logo -->
            <v-img src="../assets/cloudbookdBlk.png" class="mx-auto siteLogo">
            </v-img>
            <p class="text-center text-sm-body-2 text-md-body-1">
                your solo reading journey
            </p>
        </v-container>
    </v-app-bar>
</template>

<script>
    export default {
        name: "PageHeader",
    };
</script>

<style scoped>
    .custom-app-bar {
        padding: 70px;
    }

    .siteLogo {
        width: 200px;
    }

    @media (min-width: 1000px) {
        .siteLogo {
            width: 250px;
        }
    }
</style>
