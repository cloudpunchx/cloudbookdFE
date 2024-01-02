<template>
    <div>
        <v-btn color="error" plain x-small @click="deleteReadingChallGoal">
            Delete Current Goal
        </v-btn>

        <div class="responseMsg" v-if="responseMsg">
            {{ responseMsg }}
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "DeleteReadingChallGoal",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                currYear: process.env.VUE_APP_CURRENT_YEAR,
                responseMsg: "",
            };
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            deleteReadingChallGoal() {
                axios
                    .request({
                        url: this.apiUrl + "/reading-challenge",
                        method: "DELETE",
                        headers: {
                            token: this.token,
                        },
                        data: {
                            currYear: this.currYear,
                        },
                    })
                    .then((response) => {
                        this.responseMsg = response.data;
                        setTimeout(() => {
                            this.clearMsg();
                        }, 60000);
                    })
                    .catch((error) => {
                        this.responseMsg = error.response.data;
                        setTimeout(() => {
                            this.clearMsg();
                        }, 60000);
                    });
            },
            clearMsg() {
                this.responseMsg = "";
            },
        },
        created() {
            this.getToken();
        },
    };
</script>

<style scoped>
    .responseMsg {
        font-size: 10pt;
        font-weight: bold;
        background-color: #f4cbc6;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
    }
</style>
