<template>
    <div>
        <v-container class="pageContent">
            <v-row>
                <v-col>
                    <h1 class="header">Currently Reading</h1>
                    <v-card
                        v-for="book in books"
                        :key="book.bookId"
                        color="background"
                        elevation="0"
                        class="pa-2"
                    >
                        <v-row align="center" dense>
                            <v-col cols="3" sm="2" md="3" lg="3">
                                <!-- clickable img - route to BookPage w/Book Name + ID -->
                                <v-img
                                    contain
                                    class="bookCoverImg"
                                    :src="book.Cover_Img"
                                    @click="
                                        navigateToBookPage(
                                            book.bookId,
                                            book.Title
                                        )
                                    "
                                ></v-img>
                            </v-col>

                            <v-col sm="10" md="9" lg="9">
                                <!-- clickable Title - route to BookPage w/Book Name + ID -->
                                <p
                                    class="bookTitle clickableLink mx-2"
                                    @click="
                                        navigateToBookPage(
                                            book.bookId,
                                            book.Title
                                        )
                                    "
                                >
                                    {{ book.Title }}
                                </p>

                                <v-card-text>
                                    <v-row align="center" class="mx-0">
                                        <div
                                            class="text-subtitle-2 clickableLink"
                                            @click="searchAuthor(book.Author)"
                                        >
                                            {{ book.Author }}
                                        </div>
                                    </v-row>
                                </v-card-text>

                                <v-divider class="mx-4 my-1"></v-divider>

                                <v-card-actions>
                                    <FinishReadingButton
                                        :bookId="book.bookId"
                                        :bookTitle="book.Title"
                                        :isOnHomePage="true"
                                    />
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import {EventBus} from "@/eventBus";

    import FinishReadingButton from "./FinishReadingButton.vue";

    export default {
        name: "CurrentlyReading",
        components: {
            FinishReadingButton,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                books: [],
                errorMsg: "",
            };
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            getCurrentlyReading() {
                axios
                    .request({
                        url: this.apiUrl + "/user-books",
                        method: "GET",
                        headers: {
                            token: this.token,
                        },
                        params: {
                            readingStatus: "currently reading",
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
            searchAuthor(author) {
                this.$router.push({
                    name: "BookSearchResultsPage",
                    params: {query: author, searchType: "author"},
                });
            },
            reloadList() {
                this.getCurrentlyReading();
            },
            clearError() {
                this.errorMsg = "";
            },
        },
        created() {
            this.getToken();
            this.getCurrentlyReading();
            // Listen for the 'bookFinished' event
            EventBus.$on("bookFinished", this.reloadList);
        },
        beforeDestroy() {
            EventBus.$off("bookFinished", this.reloadList);
        },
    };
</script>

<style scoped>
    .pageContent {
        background-color: #f7edf0;
    }
    .header {
        color: #6e4b6a;
        font-family: open-sans-regular;
        font-weight: 600;
        font-size: 14pt;
    }

    .bookTitle {
        font-size: 12pt;
    }

    .clickableLink:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .bookCoverImg {
        width: 80px;
        cursor: pointer;
    }

    @media (min-width: 500px) {
    }

    @media (min-width: 1000px) {
        .header {
            font-size: 18pt;
        }
        .bookCoverImg {
            width: 100px;
        }
        .bookTitle {
            font-size: 14pt;
        }
    }
</style>
