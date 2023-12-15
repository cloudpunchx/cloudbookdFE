<template>
    <div>
        <v-card
            class="mx-auto my-6"
            max-width="600"
            color="background"
            elevation="0"
        >
            <v-row align="center">
                <v-col cols="4">
                    <v-img
                        src="../assets/ghostWithBooksStyle3.png"
                        class="ma-4 ghostImg"
                    ></v-img>
                </v-col>

                <v-col>
                    <v-card-subtitle class="overline"
                        >{{ currentYear }} READING CHALLENGE</v-card-subtitle
                    >

                    <!-- https://www.youtube.com/watch?v=lLIwx145O_A COMPUTED PROPERTIES VIDEO FOR IMPLEMENTING CALCULATION ON BOOKS -->
                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <!-- show if user set goal-->
                            <div
                                v-if="userReadingGoal !== null"
                                class="my-2 subtitle-1"
                            >
                                <!-- Use the BooksRead component to display only the number of books read -->
                                <BooksRead :showNumber="true" />
                            </div>

                            <v-progress-linear
                                v-if="!errorMsg && userReadingGoal !== null"
                                v-model="progressPercentage"
                                color="secondary"
                                height="20"
                            >
                                <template v-slot:default="{value}">
                                    <strong
                                        >({{ Math.ceil(value) }}%)
                                        {{ booksReadThisYear }}/{{
                                            userReadingGoal
                                        }}</strong
                                    >
                                </template>
                            </v-progress-linear>

                            <v-progress-linear
                                v-if="!userReadingGoal && !errorMsg"
                                indeterminate
                                color="primary"
                            ></v-progress-linear>

                            <!-- <div class="black--text ms-4 my-1" v-if="errorMsg">
                                Error: {{ errorMsg }}
                            </div> -->
                        </v-row>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-expansion-panels flat inset>
                        <v-expansion-panel>
                            <v-expansion-panel-header
                                v-if="userReadingGoal !== null"
                                class="setGoalPanel subtitle-2"
                                color="background"
                            >
                                EDIT GOAL
                            </v-expansion-panel-header>
                            <v-expansion-panel-header
                                v-else
                                class="setGoalPanel subtitle-2"
                                color="background"
                            >
                                SET GOAL
                            </v-expansion-panel-header>
                            <v-expansion-panel-content
                                class="setGoalPanel"
                                color="background"
                            >
                                <v-card-actions>
                                    <!-- Need to change depending on if user needs to set or edit goal -->
                                    <SetReadingChallGoal />
                                </v-card-actions>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BooksRead from "@/components/BooksRead.vue";
    import SetReadingChallGoal from "./SetReadingChallGoal.vue";

    export default {
        name: "ReadingChallenge",
        components: {
            BooksRead,
            SetReadingChallGoal,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                currentYear: 2024, //manually change this every year (for now- could return to and automate)
                userReadingGoal: null,
                booksReadThisYear: "",
                booksRemainingToGoal: "",
                progressPercentage: 0,
                errorMsg: "",
            };
        },
        watch: {
            // Watch for changes in booksReadThisYear and userReadingGoal to update the progress
            booksReadThisYear: "updateProgress",
            userReadingGoal: "updateProgress",
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            getUserReadingGoal() {
                axios
                    .request({
                        url: this.apiUrl + "/reading-challenge",
                        method: "GET",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                    })
                    .then((response) => {
                        this.userReadingGoal = response.data.ReadingGoal;
                    })
                    .catch((error) => {
                        this.errorMsg = error;
                    });
            },
            // Method to update the progress percentage
            // not sure if this works yet
            updateProgress() {
                if (this.userReadingGoal > 0) {
                    this.progressPercentage =
                        (this.booksReadThisYear / this.userReadingGoal) * 100;
                } else {
                    this.progressPercentage = 0;
                }
            },
        },
        created() {
            this.getUserReadingGoal();
            this.getToken();
        },
    };
</script>

<style scoped>
    .ghostImg {
        width: 75px;
        border-radius: 15px;
    }

    .goalInput {
        max-width: 80px;
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
