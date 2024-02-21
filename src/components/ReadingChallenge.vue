<template>
    <div>
        <!-- Reading Challenge Card -->
        <v-card class="challCard my-8" color="primary" elevation="15">
            <v-row align="center">
                <!-- First Col - Ghost Img -->
                <v-col cols="3" lg="3">
                    <v-img
                        src="../assets/ghostHoldingBooks.png"
                        alt="Cartoon ghost holding books with starry background."
                        class="ghostImg"
                    ></v-img>
                </v-col>

                <v-col cols="9" lg="9">
                    <v-card-subtitle class="overline"
                        >{{ currYear }} READING CHALLENGE</v-card-subtitle
                    >

                    <v-card-text v-if="userReadingGoal !== null">
                        <v-row align="center" class="mx-0">
                            <!-- show if user set goal-->
                            <div
                                class="my-2 subtitle-1"
                                v-if="booksReadThisYear.length >= 1"
                            >
                                <!-- Get # of books read this year emit from BooksRead.vue-->
                                <GetBooksRead
                                    @booksReadThisYear="handleBooksReadThisYear"
                                />
                                <p>{{ booksReadThisYear }} books completed</p>
                            </div>

                            <v-progress-linear
                                v-if="userReadingGoal !== null"
                                v-model="progressPercentage"
                                color="white"
                                height="20"
                                class="non-interactive-progress-bar whiteText"
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
                                color="background"
                            ></v-progress-linear>

                            <div class="errorMsg" v-if="errorMsg">
                                {{ errorMsg }}
                            </div>
                        </v-row>
                    </v-card-text>

                    <v-divider class="mx-4" dark></v-divider>

                    <v-expansion-panels v-model="activePanel" flat dark>
                        <v-expansion-panel v-if="userReadingGoal !== null">
                            <!-- If User HAS set a reading goal, show Edit Goal(PATCH) -->
                            <v-expansion-panel-header
                                v-if="userReadingGoal !== null"
                                class="subtitle-2"
                                color="primary"
                            >
                                EDIT GOAL
                            </v-expansion-panel-header>

                            <!-- Component - Edit Goal (PATCH) -->
                            <v-expansion-panel-content color="primary">
                                <v-card-actions>
                                    <EditReadingChallGoal
                                        @goalAction="handleGoalAction"
                                    />
                                </v-card-actions>
                                <v-row justify="end">
                                    <v-col>
                                        <DeleteReadingChallGoal
                                            @readingGoalDeleted="deleteGoal"
                                        />
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel v-else>
                            <!-- Else show Set Goal(PUT) -->
                            <v-expansion-panel-header
                                class="subtitle-2"
                                color="primary"
                            >
                                SET GOAL
                            </v-expansion-panel-header>

                            <!-- Component - Set Goal (PUT) -->
                            <v-expansion-panel-content color="primary">
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
    import GetBooksRead from "@/components/GetBooksRead.vue";
    import SetReadingChallGoal from "./SetReadingChallGoal.vue";
    import EditReadingChallGoal from "./EditReadingChallGoal.vue";
    import DeleteReadingChallGoal from "./DeleteReadingChallGoal.vue";

    export default {
        name: "ReadingChallenge",
        components: {
            GetBooksRead,
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
                progressPercentage: 0,
                activePanel: null,
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
                        this.clearError();
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        // Set a timeout to clear the error after 1 minute
                        setTimeout(() => {
                            this.clearError();
                        }, 60000); // 1 minute = 60,000 milliseconds
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
                this.activePanel = [];
            },
            // Handle the custom event and update the booksReadThisYear variable
            handleBooksReadThisYear(value) {
                this.booksReadThisYear = value;
            },
            deleteGoal() {
                this.userReadingGoal = null;
                this.activePanel = [];
            },
            clearError() {
                this.errorMsg = "";
            },
        },
        created() {
            this.getUserReadingGoal();
            this.getToken();
        },
    };
</script>

<style scoped>
    .challCard {
        color: white;
    }

    .ghostImg {
        width: 100px;
    }

    .whiteText {
        color: white;
    }

    .goalInput {
        max-width: 80px;
    }

    .errorMsg {
        font-size: 10pt;
        color: red;
    }

    .non-interactive-progress-bar {
        pointer-events: none; /* This will make the progress bar non-clickable */
    }

    @media (min-width: 600px) {
        /* Medium Sizing */
    }

    @media (min-width: 1000px) {
        /* Desktop Sizing and Larger */
    }
</style>
