<template>
    <div>
        <SignedInHeader />

        <v-container class="pageContent">
            <p class="headerText">Search</p>

            <v-row no-gutters>
                <v-col lg="8">
                    <!-- Search Books input w button -->
                    <v-card max-width="500" color="lavender">
                        <v-row no-gutters align="center">
                            <v-col cols="12" sm="9">
                                <v-text-field
                                    class="textField ma-4"
                                    v-model="query"
                                    :placeholder="query"
                                    hide-details
                                    clearable
                                    prepend-inner-icon="mdi-magnify"
                                    background-color="background"
                                    color="primary"
                                    outlined
                                    rounded
                                >
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-btn
                                    color="primary"
                                    class="searchBtn"
                                    rounded
                                    @click="search_books"
                                    >Search</v-btn
                                >
                            </v-col>
                        </v-row>
                    </v-card>

                    <!-- Search Results container -->
                    <v-card
                        v-for="book in books"
                        :key="book.id"
                        max-width="500"
                        color="lavender"
                        elevation="0"
                        class="pa-2 mt-4"
                    >
                        <v-row align="center" no-gutters>
                            <v-col cols="3">
                                <v-img
                                    v-if="
                                        book.volumeInfo.imageLinks &&
                                        book.volumeInfo.imageLinks
                                            .smallThumbnail
                                    "
                                    contain
                                    class="bookCoverImg"
                                    :src="
                                        book.volumeInfo.imageLinks
                                            .smallThumbnail
                                    "
                                ></v-img>
                            </v-col>

                            <v-col>
                                <v-card-text>
                                    <p class="bookTitle">
                                        {{ book.volumeInfo.title }}
                                    </p>
                                    <p class="text-subtitle-2">
                                        {{ book.volumeInfo.authors }}
                                    </p>
                                    <v-divider></v-divider>
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn color="primary" text>
                                        Want to Read
                                    </v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card max-width="200" color="background" elevation="0">
                        <v-img src="../assets/readGhouls.png"></v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "BookSearchResultsPage",
        components: {
            SignedInHeader,
        },
        data() {
            return {
                token: "",
                apiKey: process.env.VUE_APP_API_KEY,
                // query: this.$route.params.query,
                query: "",
                books: [],
                errorMsg: "",
            };
        },
        methods: {
            search_books() {
                axios
                    .get("https://www.googleapis.com/books/v1/volumes", {
                        params: {
                            q: `intitle:${this.query} OR inauthor:${this.query}`,
                            key: this.apiKey,
                        },
                    })
                    .then((response) => {
                        this.books = response.data.items;
                        console.log("Search Results:", response.data);
                    })
                    .catch((error) => {
                        console.error("API Request Error:", error.request);
                        console.error(
                            "API Response Data:",
                            error.response.data
                        );
                        console.error(
                            "API Response Status:",
                            error.response.status
                        );
                        this.errorMsg = error;
                    });
            },

            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
        },
        created() {
            document.title = `Search results for ${this.$route.params.query} | CloudBookd`;
            this.getToken();
            this.query = this.$route.params.query; // Assign the search query to the component's data
            this.search_books();
        },
    };
</script>

<style scoped>
    .pageContent {
        margin-top: 100px;
    }

    .headerText {
        font-family: open-sans-regular;
        color: black;
        font-size: 14pt;
    }

    .v-card {
        border-radius: 10px;
    }

    .searchBtn {
        font-size: 8pt;
        margin: 10px;
    }

    .bookTitle {
        font-size: 12pt;
    }

    .bookCoverImg {
        width: 80px;
    }

    @media (min-width: 500px) {
        .pageContent {
            width: 90vw;
        }
    }

    @media (min-width: 960px) {
        .pageContent {
            margin-top: 30px;
        }
    }

    @media (min-width: 1000px) {
        .pageContent {
            max-width: 900px;
        }

        .headerText {
            font-size: 18pt;
        }

        .bookTitle {
            font-size: 14pt;
        }

        .bookCoverImg {
            width: 100px;
        }
    }
</style>
