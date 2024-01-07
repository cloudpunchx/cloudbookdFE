<template>
    <div>
        <SignedInHeader />
        <v-card
            class="bookInfoContainer mx-auto my-10"
            max-width="800"
            color="background"
            elevation="0"
        >
            <v-row>
                <v-col cols="12" lg="4">
                    <v-img
                        class="bookCoverImg"
                        :src="book.volumeInfo.imageLinks.thumbnail"
                    ></v-img>

                    <!-- User Input for Rating -->
                    <v-rating
                        v-model="userRating"
                        :size="getRatingSize()"
                        color="amber"
                        hover
                        dense
                        half-increments
                    ></v-rating>
                    <v-btn text> WANT TO READ </v-btn>
                </v-col>

                <v-col cols="12" lg="8">
                    <p class="bookTitle">
                        {{ book.volumeInfo.title }}
                    </p>

                    <p class="authorName">
                        {{ book.volumeInfo.authors.join(", ") }}
                    </p>

                    <!-- Only show rating IF book has ratings -->
                    <div
                        v-if="book.volumeInfo.averageRating !== undefined"
                        class="d-flex"
                    >
                        <v-rating
                            :value="book.volumeInfo.averageRating"
                            :size="getRatingSize()"
                            color="amber"
                            dense
                            half-increments
                            readonly
                        ></v-rating>

                        <p class="bookRating">
                            {{ book.volumeInfo.averageRating }}
                            avg. rating - ({{ book.volumeInfo.ratingsCount }}
                            ratings)
                        </p>
                    </div>

                    <!-- Needed to use v-html because the API call is returning some HTML in book description-->
                    <p
                        class="bookDescription"
                        v-html="book.volumeInfo.description"
                    ></p>

                    <p class="genres">
                        {{ book.volumeInfo.categories.join(", ") }}
                    </p>

                    <p class="publishDate text-overline">
                        Published
                        {{ book.volumeInfo.publishedDate }} by
                        {{ book.volumeInfo.publisher }}
                    </p>

                    <p class="text-overline">
                        {{ book.volumeInfo.pageCount }} pages
                    </p>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";

    import axios from "axios";

    export default {
        name: "BookPage",
        components: {
            SignedInHeader,
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                bookId: "",
                book: {},
                errorMsg: "",
                userRating: 0,
            };
        },
        methods: {
            getBookInformation() {
                axios
                    .get(
                        `https://www.googleapis.com/books/v1/volumes/${this.bookId}`,
                        {
                            params: {
                                key: this.apiKey,
                            },
                        }
                    )
                    .then((response) => {
                        this.book = response.data;
                        console.log("Book Details:", this.book);
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
            // Method to calculate the size of v-rating based on screen width
            getRatingSize() {
                if (this.$vuetify.breakpoint.width < 500) {
                    return "16px"; // Adjust the size for small screens
                } else if (this.$vuetify.breakpoint.width < 1000) {
                    return "24px"; // Adjust the size for medium screens
                } else {
                    return "32px"; // Adjust the size for large screens
                }
            },
        },
        created() {
            document.title = `${this.$route.params.bookName} | CloudBookd`;
            this.bookId = this.$route.params.bookId; // Assign the bookID to selected book from data
            this.getBookInformation();
        },
    };
</script>

<style scoped>
    .bookInfoContainer {
        padding: 30px;
    }

    .bookCoverImg {
        width: 100%;
        max-width: 150px;
        border-radius: 5px;
    }

    .bookTitle {
        font-family: Georgia, "Times New Roman", Times, serif;
        font-size: 14pt;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .authorName {
        font-size: 12pt;
        margin-bottom: 5px;
    }

    .bookRating {
        font-family: Georgia, "Times New Roman", Times, serif;
        font-size: 11pt;
        margin-left: 10px;
    }

    .bookDescription {
        font-size: 10pt;
    }

    .genres {
        color: #2e294e;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
    }

    .publishDate {
        margin-bottom: 5px;
    }

    .v-btn {
        color: white;
        background-color: #c9a2c7;
        font-size: 9pt;
        margin-top: 10px;
    }

    @media (min-width: 500px) {
    }

    @media (min-width: 1000px) {
        .bookCoverImg {
            width: 100%;
            max-width: 200px;
        }

        .bookTitle {
            font-size: 24pt;
        }

        .authorName {
            font-size: 18pt;
        }

        .bookRating {
            font-size: 14pt;
        }

        .bookDescription {
            font-size: 12pt;
        }

        .v-btn {
            font-size: 12pt;
            margin: 10px;
        }
    }
</style>
