<template>
    <div>
        <v-btn text @click="addToBeRead"> Want To Read</v-btn>
        <div class="errorMsg" v-if="errorMsg">
            {{ errorMsg }}
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "ToBeReadButton",
        props: {
            bookId: String,
            bookTitle: String,
            author: Array,
            bookCover: String,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                errorMsg: "",
            };
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            addToBeRead() {
                // Convert the array of authors to a JSON-formatted string
                const authorsJson = JSON.stringify(this.author);
                axios
                    .request({
                        url: this.apiUrl + "/user-books",
                        method: "POST",
                        headers: {
                            token: this.token,
                        },
                        data: {
                            bookId: this.bookId,
                            bookTitle: this.bookTitle,
                            author: authorsJson,
                            bookCover: this.bookCover,
                            shelves: "tbr", //to be read
                        },
                    })
                    .then((response) => {
                        let responseData = response.data;
                        console.log(responseData);
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
    .v-btn {
        color: white;
        background-color: #c9a2c7;
        font-size: 9pt;
    }

    .errorMsg {
        font-size: 10pt;
        color: red;
    }

    @media (min-width: 1000px) {
        .v-btn {
            font-size: 12pt;
        }
    }
</style>
