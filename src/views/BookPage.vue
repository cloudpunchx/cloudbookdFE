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
                <v-col cols="12" lg="4" class="d-flex justify-center">
                    <div>
                        <v-img
                            class="bookCoverImg"
                            v-if="
                                book.volumeInfo &&
                                book.volumeInfo.imageLinks &&
                                book.volumeInfo.imageLinks.thumbnail
                            "
                            :src="book.volumeInfo.imageLinks.thumbnail"
                        ></v-img>

                        <!-- Update book to tbr, currently reading, finished -->
                        <v-btn
                            @click="dialog = true"
                            class="addToBooksBtn"
                            color="lavender"
                            dark
                        >
                            Add To My Books
                        </v-btn>

                        <v-dialog v-model="dialog" max-width="400px">
                            <v-card
                                class="dialog-content"
                                color="lavender"
                                rounded="lg"
                            >
                                <v-row>
                                    <v-col
                                        class="d-flex flex-column justify-center align-center"
                                    >
                                        <v-card-title class="cardTitle"
                                            >Choose a Shelf</v-card-title
                                        >
                                        <v-card-text>
                                            <ToBeReadButton
                                                :bookId="bookId"
                                                :bookTitle="bookTitle"
                                                :author="author"
                                                :bookCover="bookCover"
                                                @statusChanged="dialog = false"
                                            />
                                            <CurrentlyReadingButton
                                                :bookId="bookId"
                                                :bookTitle="bookTitle"
                                                :author="author"
                                                :bookCover="bookCover"
                                                @statusChanged="dialog = false"
                                            />
                                            <FinishReadingButton
                                                :bookId="bookId"
                                                :bookTitle="bookTitle"
                                                :author="author"
                                                :bookCover="bookCover"
                                                @statusChanged="dialog = false"
                                            />
                                        </v-card-text>

                                        <v-card-actions
                                            class="d-flex justify-center"
                                        >
                                            <v-btn
                                                color="primary"
                                                text
                                                @click="dialog = false"
                                            >
                                                Close
                                            </v-btn>
                                        </v-card-actions>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-dialog>
                    </div>
                </v-col>

                <v-col cols="12" lg="8">
                    <p
                        v-if="book.volumeInfo && book.volumeInfo.title"
                        class="bookTitle"
                    >
                        {{ book.volumeInfo.title }}
                    </p>

                    <p class="authorName" v-if="book.volumeInfo?.authors">
                        {{ book.volumeInfo.authors.join(", ") }}
                    </p>

                    <!-- Only show rating IF book has ratings -->
                    <div
                        v-if="book.volumeInfo?.averageRating !== undefined"
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
                        v-html="book.volumeInfo?.description"
                    ></p>

                    <p class="genres" v-if="book.volumeInfo?.categories">
                        {{ book.volumeInfo.categories.join(", ") }}
                    </p>

                    <p class="publishDate text-overline">
                        Published
                        {{ book.volumeInfo?.publishedDate }} by
                        {{ book.volumeInfo?.publisher }}
                    </p>

                    <p class="text-overline">
                        {{ book.volumeInfo?.pageCount }} pages
                    </p>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import ToBeReadButton from "@/components/ToBeReadButton.vue";
    import CurrentlyReadingButton from "@/components/CurrentlyReadingButton.vue";
    import FinishReadingButton from "@/components/FinishReadingButton.vue";

    import axios from "axios";

    export default {
        name: "BookPage",
        components: {
            SignedInHeader,
            ToBeReadButton,
            CurrentlyReadingButton,
            FinishReadingButton,
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                bookId: "",
                book: {},
                bookTitle: "",
                author: "",
                bookCover: "",
                dialog: false,
                errorMsg: "",
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
                        this.bookTitle = this.book.volumeInfo.title;
                        this.author = this.book.volumeInfo.authors.join(", ");
                        this.bookCover =
                            this.book.volumeInfo.imageLinks.thumbnail;
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

    .addToBooksBtn {
        margin-top: 25px;
    }

    .cardTitle {
        color: white;
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

    .tbrBtnContainer {
        margin-top: 10px;
    }

    .dialog-content {
        overflow: hidden; /* hide the scroll bars */
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

        .tbrBtnContainer {
            margin: 10px;
        }
    }
</style>
