<template>
    <div>
        <!-- Reading Challenge Card -->
        <v-card
            class="mx-auto my-6"
            max-width="600"
            color="background"
            elevation="0"
        >
            <v-row align="center">
                <!-- First Col - Ghost Img -->
                <v-col cols="4">
                    <v-img
                        src="../assets/ghostWithBooksStyle3.png"
                        class="ghostImg ma-4"
                    ></v-img>
                </v-col>

                <v-col>
                    <v-card-subtitle class="overline"
                        >{{ currYear }} READING CHALLENGE</v-card-subtitle
                    >

                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <!-- show if user set goal-->
                            <div
                                v-if="userReadingGoal !== null"
                                class="my-2 subtitle-1"
                            >
                                <!-- Get # of books read this year emit from BooksRead.vue-->
                                <BooksRead
                                    @booksReadThisYear="handleBooksReadThisYear"
                                />
                                <p>{{ booksReadThisYear }} books completed</p>
                            </div>

                            <v-progress-linear
                                v-if="userReadingGoal !== null"
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

                            <div class="errorMsg" v-if="errorMsg">
                                {{ errorMsg }}
                            </div>
                        </v-row>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-expansion-panels flat>
                        <v-expansion-panel v-if="userReadingGoal !== null">
                            <!-- If User HAS set a reading goal, show Edit Goal(PATCH) -->
                            <v-expansion-panel-header
                                v-if="userReadingGoal !== null"
                                class="setGoalPanel subtitle-2"
                                color="background"
                            >
                                EDIT GOAL
                            </v-expansion-panel-header>

                            <!-- Component - Edit Goal (PATCH) -->
                            <v-expansion-panel-content
                                class="setGoalPanel"
                                color="background"
                            >
                                <v-card-actions>
                                    <EditReadingChallGoal
                                        @goalAction="handleGoalAction"
                                    />
                                </v-card-actions>
                                <v-row justify="end">
                                    <v-col>
                                        <DeleteReadingChallGoal />
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel v-else>
                            <!-- Else show Set Goal(PUT) -->
                            <v-expansion-panel-header
                                class="setGoalPanel subtitle-2"
                                color="background"
                            >
                                SET GOAL
                            </v-expansion-panel-header>

                            <!-- Component - Set Goal (PUT) -->
                            <v-expansion-panel-content
                                class="setGoalPanel"
                                color="background"
                            >
                                <v-card-actions>
                                    <SetReadingChallGoal
                                        @goalAction="handleGoalAction"
                                    />
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
    import EditReadingChallGoal from "./EditReadingChallGoal.vue";
    import DeleteReadingChallGoal from "./DeleteReadingChallGoal.vue";

    export default {
        name: "ReadingChallenge",
        components: {
            BooksRead,
            SetReadingChallGoal,
            EditReadingChallGoal,
            DeleteReadingChallGoal,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                currYear: process.env.VUE_APP_CURRENT_YEAR,
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
                        this.updateProgress();
                    })
                    .catch((error) => {
                        this.errorMsg = error;
                    });
            },
            // Method to update the progress percentage on books completed
            updateProgress() {
                if (this.userReadingGoal > 0) {
                    this.progressPercentage =
                        (this.booksReadThisYear / this.userReadingGoal) * 100;
                } else {
                    this.progressPercentage = 0;
                }
            },
            handleGoalAction() {
                // Reload to get the goal after the action (set or edit)
                this.getUserReadingGoal();
            },
            // Handle the custom event and update the booksReadThisYear variable
            handleBooksReadThisYear(value) {
                this.booksReadThisYear = value;
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

    .errorMsg {
        font-size: 10pt;
        color: red;
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
