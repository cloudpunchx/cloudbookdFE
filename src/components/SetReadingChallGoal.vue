<template>
    <div>
        <v-text-field class="goalInput" dense> </v-text-field>
        <v-btn color="primary" text> Submit </v-btn>
    </div>
</template>

<!-- SET READINGCHALLENGE SO IF USER HAS NOT MADE A GOAL THEN THE BOX HAS SETREADINGCHALL -->
<!-- IF THEY HAVE SET A GOAL THEN ONLY SHOW THE PATCH GOAL -->

<!-- can we set currYear as a global var instead of in each component? -->

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "SetReadingChallGoal",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
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
                            // readingGoal
                            // currYear
                        },
                    })
                    .then((response) => {
                        this.userReadingGoal = response.data.ReadingGoal;
                    })
                    .catch((error) => {
                        this.errorMsg = error;
                    });
            },
        },
        created() {
            this.getToken();
            this.setReadingChallGoal();
        },
    };
</script>

<style scoped></style>
