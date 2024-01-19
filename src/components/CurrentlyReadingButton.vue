<template>
    <div>
        <v-btn @click="currentlyReading" color="lavender" dark elevation="0"
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
            // might need to change author back to Array
            author: String,
            bookCover: String,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                responseMsg: "",
                errorMsg: "",
            };
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            currentlyReading() {
                axios
                    .request({
                        url: this.apiUrl + "/user-books",
                        method: "GET",
                        headers: {
                            token: this.token,
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
                            console.log("Book exists:", response.data.bookId);
                            console.log(this.bookId);
                            this.markCurrentlyReading();
                        } else {
                            console.log("Book does not exist:", response.data);
                            console.log(this.bookId);
                            // Book does not exist - Add the book with status 'currently reading'
                            this.updateBookStatus();
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
                            token: this.token,
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
                            token: this.token,
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
        created() {
            this.getToken();
        },
    };
</script>

<style scoped>
    .v-btn {
        font-size: 9pt;
    }
    .responseMsg {
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
