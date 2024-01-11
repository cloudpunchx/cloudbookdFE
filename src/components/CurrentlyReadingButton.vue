<template>
    <div>
        <v-btn @click="currentlyReading" color="lavender" dark elevation="0"
            >Currently Reading</v-btn
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
        name: "CurrentlyReadingButton",
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
                        // Assuming the existence of the book is indicated by the value of `bookId` in the first object of the array
                        let bookExists =
                            response.data.length > 0 &&
                            response.data[0].bookId === 1;

                        if (bookExists) {
                            // Book exists - Update the book status to 'currently reading'
                            console.log("Book exists:", response.data);
                            console.log(this.bookId);
                            this.updateBookStatus();
                        } else {
                            console.log("Book does not exist:", response.data);
                            // Book does not exist - Add the book with status 'currently reading'
                            this.addBookToReadingList();
                        }
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        setTimeout(() => {
                            this.clearError();
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
                        console.log(response.data);
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        setTimeout(() => {
                            this.clearError();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    });
            },

            addBookToReadingList() {
                const authorString = this.author.join(", ");
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
                        console.log(response.data);
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
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
