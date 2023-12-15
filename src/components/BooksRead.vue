<template>
    <div>
        <!-- Loading state -->
        <div v-if="loading">Loading...</div>

        <!-- Display error message -->
        <div v-if="errorMsg" class="error-message">Error: {{ errorMsg }}</div>

        <p v-if="showNumber && !loading && !errorMsg">
            {{ booksReadThisYear }} books completed
        </p>
        <div v-else>
            <!-- Display cover, title, authors, etc. -->
            <div v-for="book in books" :key="book.id">
                <img :src="book.cover" alt="Book Cover" />
                <p>{{ book.title }}</p>
                <p>By: {{ book.authors.join(", ") }}</p>
                <!-- Add more details as needed -->
            </div>
        </div>
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
                loading: false,
                errorMsg: "",
                booksReadThisYear: 0,
                books: [],
            };
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            // API NOT DONE BECAUSE BACK END NOT SET UP YET
            getBooksRead() {
                this.loading = true; // Set loading state
                axios
                    .request({
                        url: this.apiUrl + "/books-read",
                        method: "GET",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                    })
                    .then((response) => {
                        if (this.showNumber) {
                            this.booksReadThisYear = response.data.booksRead;
                        } else {
                            this.books = response.data.books;
                        }
                    })
                    .catch((error) => {
                        this.errorMsg = error.message || "An error occurred";
                    })
                    .finally(() => {
                        this.loading = false; // Reset loading state
                    });
            },
        },
        created() {
            this.getBooksRead();
            this.getToken();
        },
    };
</script>

<style scoped>
    .error-message {
        color: red;
    }
</style>
