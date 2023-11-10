<template>
    <v-app-bar color="background" flat class="custom-app-bar">
        <v-container>
            <v-row justify-content="center" align-content="center">
                <v-col>
                    <!-- Logo -->
                    <!-- THIS LINK MIGHT NEED TO BE FIXED -->
                    <a href="../views/AccessPage.vue">
                        <v-img
                            src="../assets/cloudbookdBlk.png"
                            class="mx-auto siteLogo"
                        >
                        </v-img>
                    </a>
                    <p class="text-center text-sm-body-2 text-md-body-1">
                        your solo reading journey
                    </p>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
    export default {
        name: "NotSignedInHeader",
        computed: {
            isMobile() {
                const isMobile = this.$vuetify.breakpoint.smAndDown;
                console.log("isMobile:", isMobile);
                return isMobile;
            },
        },
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
