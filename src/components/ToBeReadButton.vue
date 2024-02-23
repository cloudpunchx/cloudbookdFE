<template>
    <div>
        <v-btn @click="addToBeRead" color="transparent" dark elevation="0">
            Want To Read</v-btn
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
        name: "ToBeReadButton",
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
                responseMsg: "",
                errorMsg: "",
            };
        },
        methods: {
            addToBeRead() {
                let authorString;
                // Check if 'author' is an array and join into a string if it is
                if (Array.isArray(this.author)) {
                    authorString = this.author.join(", ");
                } else {
                    // If 'author' is not an array, use it directly as a string
                    authorString = this.author;
                }
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
                            readingStatus: "tbr",
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
                        // Set a timeout to clear the error after 1 minute
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
