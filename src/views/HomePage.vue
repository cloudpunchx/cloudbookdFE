<template>
    <div>
        <SignedInHeader />

        <v-container class="pageContent">
            <v-row>
                <v-col>
                    <!-- Currently Reading Container -->
                    <v-card color="lavender">
                        <v-card-actions>
                            <p
                                class="header font-weight-medium white--text mx-auto"
                            >
                                Currently Reading
                            </p>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col>
                    <!-- Reading Challenge Container -->
                    <v-card color="lavender" class="readingChallengeContainer">
                        <v-card-actions>
                            <p
                                class="header font-weight-medium white--text mx-auto"
                            >
                                Reading Challenge
                                <!-- ghost with books img in assets ready -->
                            </p>
                        </v-card-actions>
                    </v-card>

                    <!-- To Be Read Container -->
                    <v-card color="lavender">
                        <v-card-actions>
                            <p
                                class="header font-weight-medium white--text mx-auto"
                            >
                                To Be Read
                            </p>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <LogoutButton />

            <!-- IDEA: Below the current content have a grid for each created bookshelf, that displays the list name and a selected book cover img that is a link to list page -->
        </v-container>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import LogoutButton from "@/components/LogoutButton.vue";

    export default {
        name: "HomePage",
        components: {
            SignedInHeader,
            LogoutButton,
        },
    };
</script>

<style scoped>
    .pageContent {
        margin-top: 100px;
    }

    .header {
        font-family: lobster;
    }

    .readingChallengeContainer {
        margin-bottom: 10px;
    }

    @media (min-width: 500px) {
        .pageContent {
            width: 90vw;
        }

        .header {
            font-size: 15pt;
        }
    }

    @media (min-width: 1000px) {
        .pageContent {
            max-width: 900px;
        }

        .header {
            font-size: 17pt;
        }
    }

    @media (min-width: 1500px) {
        .pageContainer {
            max-width: 1000px;
        }

        .header {
            font-size: 20pt;
        }
    }
</style>
