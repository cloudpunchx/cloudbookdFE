<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <!-- <v-img
                        :src="book.volumeInfo.imageLinks.smallThumbnail"
                    ></v-img> -->
                </v-col>
                <v-col> </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "BookPage",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                bookId: "",
                book: {},
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
        },
        created() {
            document.title = `${this.$route.params.bookName} | CloudBookd`;
            this.bookId = this.$route.params.bookId; // Assign the bookID to selected book from data
            // this.getBookInformation();
        },
    };
</script>

<style scoped></style>
