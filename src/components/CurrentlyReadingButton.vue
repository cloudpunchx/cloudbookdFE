<template>
    <div>
        <v-btn @click="checkBookExists" color="transparent" dark elevation="0"
            >Currently Reading</v-btn
        >
        <div class="responseMsg" v-if="responseMsg">
            {{ responseMsg }}
        </div>
        <div class="errorMsg" v-if="errorMsg">
            {{ errorMsg }}
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "CurrentlyReadingButton",
        props: {
            bookId: String,
            bookTitle: String,
            author: String,
            bookCover: String,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                responseMsg: "",
                errorMsg: "",
            };
        },
        methods: {
            checkBookExists() {
                axios
                    .request({
                        url: this.apiUrl + "/user-books",
                        method: "GET",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                        params: {
                            bookId: this.bookId,
                        },
                    })
                    .then((response) => {
                        // check if bookExists
                        let bookExists = response.bookId === 1;
                        if (bookExists) {
                            // Book exists - Update the book status to 'currently reading'
                            this.updateBookStatus();
                        } else {
                            // Book does not exist - Add the book with status 'currently reading'
                            this.markCurrentlyReading();
                        }
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        setTimeout(() => {
                            this.clearResponse();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    });
            },

            updateBookStatus() {
                // PATCH request to update the book status
                axios
                    .request({
                        url: this.apiUrl + "/user-books",
                        method: "PATCH",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                        data: {
                            bookId: this.bookId,
                            readingStatus: "currently reading",
                        },
                    })
                    .then((response) => {
                        this.responseMsg = response.data;
                        // Set a timeout to clear the response after 1 minute
                        setTimeout(() => {
                            this.clearResponse();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        setTimeout(() => {
                            this.clearResponse();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    });
            },

            markCurrentlyReading() {
                let authorString;
                // Check if 'author' is an array and join into a string if it is
                if (Array.isArray(this.author)) {
                    authorString = this.author.join(", ");
                } else {
                    // If 'author' is not an array, use it directly as a string
                    authorString = this.author;
                }
                // POST request to add the book to user books
                axios
                    .request({
                        url: this.apiUrl + "/user-books",
                        method: "POST",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                        data: {
                            bookId: this.bookId,
                            bookTitle: this.bookTitle,
                            author: authorString,
                            bookCover: this.bookCover,
                            readingStatus: "currently reading",
                        },
                    })
                    .then((response) => {
                        this.responseMsg = response.data;
                        // Set a timeout to clear the response after 1 minute
                        setTimeout(() => {
                            this.clearResponse();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        setTimeout(() => {
                            this.clearResponse();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    });
            },
            clearResponse() {
                this.errorMsg = "";
                this.responseMsg = "";
            },
        },
    };
</script>

<style scoped>
    .v-btn {
        font-size: 9pt;
    }
    .responseMsg {
        color: #c9a2c7;
        margin-left: 20px;
    }

    .errorMsg {
        font-size: 10pt;
        color: red;
        margin-left: 20px;
    }
    @media (min-width: 1000px) {
        .v-btn {
            font-size: 12pt;
        }
    }
</style>
