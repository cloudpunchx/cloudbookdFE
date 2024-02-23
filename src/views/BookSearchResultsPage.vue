<template>
    <div>
        <SignedInHeader class="signedInHeaderClass" />
        <StarsFullSizeComponent class="starsContainer" />

        <v-container class="pageContent">
            <h1 class="header">Search Results</h1>

            <v-row no-gutters>
                <v-col lg="8">
                    <!-- Search Books input w button (user can search with header search or this one)-->
                    <v-card max-width="500" color="primary" shaped>
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
                                    dark
                                >
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-btn
                                    color="background"
                                    class="searchBtn"
                                    rounded
                                    dark
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
                                        color="lavender"
                                    ></v-radio>
                                    <v-radio
                                        label="Title"
                                        value="title"
                                        color="lavender"
                                    ></v-radio>
                                    <v-radio
                                        label="Author"
                                        value="author"
                                        color="lavender"
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
                        color="primary"
                        class="pa-2 mt-4"
                        shaped
                    >
                        <v-row align="center" no-gutters>
                            <v-col cols="3" class="d-flex justify-center">
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
                                    <!-- Check if authors property exists before using join -->
                                    <p
                                        v-if="book.volumeInfo.authors"
                                        class="authorName text-subtitle-2"
                                    >
                                        by
                                        {{ book.volumeInfo.authors.join(", ") }}
                                    </p>

                                    <p class="publishDate text-overline">
                                        published
                                        {{ book.volumeInfo.publishedDate }}
                                    </p>

                                    <!-- Only show rating IF book has ratings -->
                                    <div
                                        v-if="
                                            book.volumeInfo.averageRating !==
                                            undefined
                                        "
                                        class="d-flex"
                                    >
                                        <v-rating
                                            :value="
                                                book.volumeInfo.averageRating
                                            "
                                            color="amber"
                                            dense
                                            half-increments
                                            readonly
                                            size="14"
                                        ></v-rating>

                                        <p class="ms-4 text-caption">
                                            {{ book.volumeInfo.averageRating }}
                                            avg. rating - ({{
                                                book.volumeInfo.ratingsCount
                                            }}
                                            ratings)
                                        </p>
                                    </div>
                                    <v-divider dark></v-divider>
                                </v-card-text>

                                <!-- button to bring user to book page -->
                                <v-card-actions>
                                    <router-link
                                        :to="{
                                            name: 'BookPage',
                                            params: {
                                                bookId: book.id,
                                                bookName: book.volumeInfo.title,
                                            },
                                        }"
                                    >
                                        <v-btn color="lavender" text
                                            >View Details</v-btn
                                        >
                                    </router-link>
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
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import StarsFullSizeComponent from "@/components/StarsFullSizeComponent.vue";

    import axios from "axios";

    export default {
        name: "BookSearchResultsPage",
        components: {
            SignedInHeader,
            StarsFullSizeComponent,
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                searchType: "all",
                query: "",
                books: [],
                errorMsg: "",
                bookId: "",
                bookName: "",
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
        },
        created() {
            document.title = `Search results for ${this.$route.params.query} | CloudBookd`; // Assign search query to title
            this.query = this.$route.params.query; // Assign the search query to the component's data
            this.searchType = this.$route.params.searchType || "all";
            this.search_books();
        },
    };
</script>

<style scoped>
    .signedInHeaderClass {
        position: relative;
        z-index: 2;
    }
    .pageContent {
        margin-top: 100px;
    }
    .header {
        color: white;
        font-family: open-sans-regular;
        font-weight: 600;
        font-size: 14pt;
        margin-bottom: 15px;
    }

    .v-card {
        color: whitesmoke;
    }

    .searchBtn {
        font-size: 8pt;
        margin: 10px;
    }

    .radioBtn {
        margin-left: 25px;
    }

    .bookCoverImg {
        border: 1px rgb(97, 97, 97) solid;
        border-radius: 5px;
    }

    .bookTitle {
        font-size: 12pt;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .authorName {
        margin-bottom: 5px;
    }

    .publishDate {
        margin-bottom: 5px;
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

        .header {
            font-size: 18pt;
        }

        .bookTitle {
            font-size: 14pt;
        }
    }
</style>
