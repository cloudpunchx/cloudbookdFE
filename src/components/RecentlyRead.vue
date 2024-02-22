<template>
    <div>
        <div class="contentContainer">
            <h1 class="header">Recently Read</h1>

            <!-- IF user has books in recently read -->
            <div v-if="displayedBooks && displayedBooks.length > 0">
                <v-card
                    v-for="book in displayedBooks"
                    :key="book.bookId"
                    color="background"
                    class="readingCard pa-2"
                >
                    <v-row align="center" dense>
                        <v-col cols="3" sm="2" md="3" lg="3">
                            <!-- clickable img - route to BookPage w/Book Name + ID -->
                            <v-img
                                contain
                                class="bookCoverImg"
                                :src="book.Cover_Img"
                                alt="Book Cover"
                                @click="
                                    navigateToBookPage(book.bookId, book.Title)
                                "
                            ></v-img>
                        </v-col>

                        <v-col sm="10" md="9" lg="9">
                            <!-- clickable Title - route to BookPage w/Book Name + ID -->
                            <p
                                class="bookTitle clickableLink mx-2"
                                @click="
                                    navigateToBookPage(book.bookId, book.Title)
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

                            <v-divider class="mx-4 my-1" dark></v-divider>
                        </v-col>
                    </v-row>
                </v-card>
            </div>

            <!-- IF user has no recently read -->
            <div v-else>
                <v-card class="readingCard" color="background">
                    <v-row justify="center" dense>
                        <v-col align="center" cols="7" sm="12" md="12" lg="12">
                            <p class="defaultText">
                                you haven't read any books yet!
                            </p>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import {EventBus} from "@/eventBus";

    export default {
        name: "RecentlyRead",
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
                // Limit the number of displayed books to 3
                return this.books.slice(0, 3);
            },
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            getRecentlyRead() {
                axios
                    .request({
                        url: this.apiUrl + "/user-books",
                        method: "GET",
                        headers: {
                            token: this.token,
                        },
                        params: {
                            readingStatus: "read",
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
                this.getRecentlyRead();
            },
            clearError() {
                this.errorMsg = "";
            },
        },
        created() {
            this.getToken();
            this.getRecentlyRead();
            // Listen for the 'bookFinished' event
            EventBus.$on("bookFinished", this.reloadList);
        },
        beforeDestroy() {
            EventBus.$off("bookFinished", this.reloadList);
        },
    };
</script>

<style scoped>
    .contentContainer {
        padding: 15px;
        border: 1px solid whitesmoke;
        border-radius: 15px 0 15px 0;
    }
    .header {
        color: whitesmoke;
        font-family: poppins;
        font-weight: 600;
        font-size: 14pt;
    }

    .readingCard {
        font-family: open-sans-regular;
        color: white;
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
    .defaultText {
        margin: 25px;
    }

    @media (min-width: 1000px) {
        /* Desktop Sizing and Larger */
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
