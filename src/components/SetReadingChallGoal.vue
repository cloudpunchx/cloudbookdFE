<template>
    <div>
        <v-row>
            <v-col class="goalInput" cols="8">
                <v-text-field
                    v-model="readingGoalInput"
                    label="Enter Goal"
                    dense
                ></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" text @click="setReadingChallGoal">
                    Submit
                </v-btn>
            </v-col>
        </v-row>

        <div class="errorMsg" v-if="errorMsg">
            {{ errorMsg }}
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
                    .then((response) => {
                        let responseData = response.data;
                        console.log(responseData);
                        // emit goalSet to hide Set Goal Panel on ReadingChallenge.vue
                        this.$emit("goalAction");
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
            clearError() {
                this.errorMsg = "";
            },
        },
        created() {
            this.getToken();
        },
    };
</script>

<style scoped>
    .goalInput {
        max-width: 120px;
    }
    .errorMsg {
        font-size: 10pt;
        color: red;
    }
</style>
