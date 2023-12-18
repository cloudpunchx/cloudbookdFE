<template>
    <div>
        <v-text-field v-model="readingGoalInput" label="Enter Goal" dense>
        </v-text-field>
        <v-btn color="primary" text @click="setReadingChallGoal">
            Submit
        </v-btn>

        <div class="black--text ms-4 my-1" v-if="errorMsg">
            Error: {{ errorMsg }}
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "SetReadingChallGoal",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                currYear: process.env.VUE_APP_CURRENT_YEAR,
                readingGoalInput: "",
                errorMsg: "",
            };
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            setReadingChallGoal() {
                axios
                    .request({
                        url: this.apiUrl + "/reading-challenge",
                        method: "POST",
                        headers: {
                            token: this.token,
                        },
                        data: {
                            readingGoal: this.readingGoalInput,
                            currYear: this.currYear,
                        },
                    })
                    .then(() => {
                        // need to config response and errors
                        // this.userReadingGoal = response.data.ReadingGoal;
                    })
                    .catch((error) => {
                        this.errorMsg = error;
                    });
            },
        },
        created() {
            this.getToken();
        },
    };
</script>

<style scoped></style>
