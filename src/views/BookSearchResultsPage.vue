<template>
    <div>
        <SignedInHeader />

        <v-container class="pageContent">
            <p class="headerText">Search Results</p>

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
                        <v-row class="mt-n7" no-gutters>
                            <v-col>
                                <!-- Radio buttons -->
                                <v-radio-group
                                    v-model="searchType"
                                    row
                                    dark
                                    class="radioBtn"
                                >
                                    <v-radio
                                        label="All"
                                        value="all"
                                        color="primary"
                                    ></v-radio>
                                    <v-radio
                                        label="Title"
                                        value="title"
                                        color="primary"
                                    ></v-radio>
                                    <v-radio
                                        label="Author"
                                        value="author"
                                        color="primary"
                                    ></v-radio>
                                </v-radio-group>
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
                            <!-- ADD LINKS TO BOOK PAGE ON TITLE AND IMG -->
                            <v-col>
                                <v-card-text>
                                    <p class="bookTitle">
                                        {{ book.volumeInfo.title }}
                                    </p>
                                    <p class="text-subtitle-2">
                                        by
                                        {{ book.volumeInfo.authors.join(", ") }}
                                    </p>
                                    <p class="text-subtitle">
                                        published
                                        {{ book.volumeInfo.publishedDate }}
                                    </p>
                                    <v-divider></v-divider>
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn color="primary" text>
                                        Read More
                                    </v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col>
                    <!-- NEED TO HIDE THIS ON MOBILE -->
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
                searchType: "all",
                query: "",
                books: [],
                errorMsg: "",
            };
        },
        methods: {
            search_books() {
                let queryType;
                if (this.searchType === "all") {
                    queryType = `intitle:${this.query} OR inauthor:${this.query}`;
                } else if (this.searchType === "title") {
                    queryType = `intitle:${this.query}`;
                } else if (this.searchType === "author") {
                    queryType = `inauthor:${this.query}`;
                }
                axios
                    .get("https://www.googleapis.com/books/v1/volumes", {
                        params: {
                            q: queryType,
                            key: this.apiKey,
                            orderBy:
                                this.searchType === "author"
                                    ? "newest"
                                    : undefined,
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
        font-weight: bold;
        color: #6e4b6a;
        font-size: 14pt;
    }

    .v-card {
        border-radius: 10px;
        color: #2e294e;
    }

    .searchBtn {
        font-size: 8pt;
        margin: 10px;
    }

    .radioBtn {
        margin-left: 25px;
    }

    .bookTitle {
        font-size: 12pt;
        font-weight: bold;
    }

    .bookCoverImg {
        width: 80px;
        border: 1px rgb(97, 97, 97) solid;
        border-radius: 5px;
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
