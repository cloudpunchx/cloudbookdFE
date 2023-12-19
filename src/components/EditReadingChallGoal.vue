<template>
    <div>
        <v-row>
            <v-col class="goalInput" cols="8">
                <v-text-field
                    v-model="readingGoalInput"
                    label="Edit Goal"
                    dense
                ></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" text @click="editReadingChallGoal">
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
        name: "EditReadingChallGoal",
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
            editReadingChallGoal() {
                axios
                    .request({
                        url: this.apiUrl + "/reading-challenge",
                        method: "PATCH",
                        headers: {
                            token: this.token,
                        },
                        data: {
                            readingGoal: this.readingGoalInput,
                            currYear: this.currYear,
                        },
                    })
                    .then(() => {
                        this.readingGoalInput = "";
                        // emit goalSet to hide Set Goal Panel on ReadingChallenge.vue
                        this.$emit("goalAction");
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                    });
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
