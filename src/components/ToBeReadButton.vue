<template>
    <div>
        <v-btn @click="addToBeRead" color="lavender" dark elevation="0">
            Want To Read</v-btn
        >
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
                // Join the array of authors into a single string separated by a comma
                const authorString = this.author.join(", ");
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
                            author: authorString,
                            bookCover: this.bookCover,
                            readingStatus: "tbr",
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
