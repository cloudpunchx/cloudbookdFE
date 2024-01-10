<template>
    <div>
        <!-- Display error message -->
        <div v-if="errorMsg" class="error-message">Error: {{ errorMsg }}</div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "BooksRead",
        props: {
            showNumber: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                errorMsg: "",
                booksReadThisYear: 0,
                books: [],
            };
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            getBooksRead() {
                const currentYear = new Date().getFullYear(); // Get the current year
                const dateFinished = `${currentYear}-12-31`; // Construct the date string
                axios
                    .request({
                        url: this.apiUrl + "/user-books",
                        method: "GET",
                        headers: {
                            token: this.token,
                        },
                        params: {
                            readingStatus: "read",
                            dateFinished: dateFinished, // Use the constructed date string
                        },
                    })
                    .then((response) => {
                        // Check if the response is an array of books
                        if (Array.isArray(response.data)) {
                            this.books = response.data; // Assign the array of books to a component variable
                            this.booksReadThisYear = response.data.length; // Assign the length to a component variable

                            // Emit a custom event with the booksReadThisYear data (used in ReadingChallenge.vue)
                            this.$emit(
                                "booksReadThisYear",
                                this.booksReadThisYear
                            );
                        } else {
                            this.books = []; // Set books to an empty array if the response is unexpected
                            this.booksReadThisYear = 0; // Set the count to 0 if the response is unexpected
                        }
                    })
                    .catch((error) => {
                        this.errorMsg = error.message || "An error occurred";
                    });
            },
        },
        created() {
            this.getToken();
            this.getBooksRead();
        },
    };
</script>

<style scoped>
    .error-message {
        color: red;
    }
</style>
