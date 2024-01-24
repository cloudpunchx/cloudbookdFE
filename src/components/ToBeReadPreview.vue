<template>
    <div>
        <v-container class="container">
            <h1 class="header">Want to Read</h1>

            <!-- Show IF tbr has books in it -->
            <v-row v-if="displayedBooks.length > 0">
                <v-col
                    v-for="book in displayedBooks"
                    :key="book.bookId"
                    class="d-flex child-flex"
                    cols="4"
                >
                    <!-- clickable img - route to BookPage w/Book Name + ID -->
                    <v-img
                        :src="book.Cover_Img"
                        class="bookCoverImg"
                        aspect-ratio="1"
                        @click="navigateToBookPage(book.bookId, book.Title)"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                    <div class="errorMsg" v-if="errorMsg">
                        {{ errorMsg }}
                    </div>
                </v-col>
            </v-row>

            <!-- otherwise show default -->
            <v-row v-else justify="center">
                <v-col cols="6" sm="6" md="6" lg="10">
                    <v-img
                        src="../assets/mrBook.png"
                        class="defaultImg"
                    ></v-img>
                    <p class="defaultText">
                        your tbr is lonely, add some books!
                    </p>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "ToBeReadPreview",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                books: [],
                errorMsg: "",
            };
        },
        computed: {
            displayedBooks() {
                // Limit the number of displayed books to 9
                return this.books.slice(0, 9);
            },
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            getToBeRead() {
                axios
                    .request({
                        url: this.apiUrl + "/user-books",
                        method: "GET",
                        headers: {
                            token: this.token,
                        },
                        params: {
                            readingStatus: "tbr",
                        },
                    })
                    .then((response) => {
                        // Check if the response is an object and convert it to an array
                        this.books = Array.isArray(response.data)
                            ? response.data
                            : [response.data];
                        console.log(response.data);
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        // Set a timeout to clear the error after 1 minute
                        setTimeout(() => {
                            this.clearError();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    });
            },
            navigateToBookPage(bookId, bookName) {
                this.$router.push({
                    name: "BookPage",
                    params: {bookId, bookName},
                });
            },
            clearError() {
                this.errorMsg = "";
            },
        },
        created() {
            this.getToken();
            this.getToBeRead();
        },
    };
</script>

<style scoped>
    .header {
        color: #6e4b6a;
        font-family: open-sans-regular;
        font-weight: 600;
        font-size: 18pt;
    }

    .container {
        background-color: #f7edf0;
    }
    .bookCoverImg {
        cursor: pointer;
    }

    .errorMsg {
        font-size: 10pt;
        color: red;
    }

    .defaultText {
        margin-top: 10px;
        color: #2e294e;
    }

    @media (min-width: 1000px) {
        .defaultImg {
            width: 200px;
            margin-top: 10px;
        }
    }
</style>
