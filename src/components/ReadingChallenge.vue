<template>
    <div>
        <!-- 1. API Call to GET user reading challenge -->
        <v-card
            class="mx-auto my-6"
            max-width="600"
            color="background"
            elevation="0"
        >
            <v-row align="center">
                <!-- need to play around with cols and set for breakpoints -->
                <v-col cols="4">
                    <v-img
                        src="../assets/ghostWithBooksStyle3.png"
                        class="ma-4 ghostImg"
                    ></v-img>
                </v-col>

                <v-col>
                    <!-- could add year to the beginning of this title - dynamic so it updates to correct calendar year, not based on user challenge -->
                    <v-card-title>READING CHALLENGE</v-card-title>

                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <div class="my-2 text-subtitle-1">
                                29 books completed
                            </div>

                            <!-- GET user progress, show on bar w % (vuetify)-->
                            <v-progress-linear
                                v-model="skill"
                                color="secondary"
                                height="20"
                            >
                                <template v-slot:default="{value}">
                                    <strong>{{ Math.ceil(value) }}%</strong>
                                </template>
                            </v-progress-linear>

                            <div class="black--text ms-4 my-1">
                                14 books behind schedule
                            </div>
                        </v-row>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-actions>
                        <!-- this btn will take you to reading challenge page -->
                        <v-btn color="primary" text> View Challenge </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "ReadingChallenge",
    };
</script>

<style scoped>
    .ghostImg {
        width: 75px;
        border-radius: 15px;
    }

    @media (min-width: 500px) {
        .ghostImg {
            width: 100px;
        }
    }

    @media (min-width: 1000px) {
    }

    @media (min-width: 1500px) {
        .ghostImg {
            width: 125px;
        }
    }
</style>
