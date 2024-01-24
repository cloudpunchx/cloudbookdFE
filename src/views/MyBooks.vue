<template>
    <div>
        <SignedInHeader />

        <v-container class="pageContent">
            <v-row justify="center">
                <!-- Page Header -->
                <h1 class="header">My Books</h1>
            </v-row>
            <v-row>
                <!-- 1st COL bookshelf list to display desired shelf -->
                <v-col
                    sm="4"
                    md="2"
                    lg="2"
                    class="d-flex justify-center fit-content"
                >
                    <v-list color="lavender" elevation="4" rounded dense dark>
                        <!-- Title of the list, non-clickable -->
                        <v-subheader>Bookshelves</v-subheader>
                        <v-list-item-group color="primary">
                            <v-list-item
                                v-for="category in bookshelfCategories"
                                :key="category.title"
                                @click="selectCategory(category.param)"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        category.title
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-col>
                <!-- 2nd COL holds books -->
                <v-col cols="12" sm="7" md="10" lg="10">
                    <div class="myBooksContainer">
                        <!-- Headings for My Books -->
                        <v-row no-gutters>
                            <v-col md="12" lg="12">
                                <v-card
                                    class="bookCard"
                                    color="background"
                                    tile
                                >
                                    <v-row>
                                        <v-col lg="1" class="columnTitle">
                                            Cover
                                        </v-col>
                                        <v-col lg="3" class="columnTitle">
                                            Title
                                        </v-col>
                                        <v-col lg="2" class="columnTitle">
                                            Author
                                        </v-col>
                                        <v-col lg="2" class="columnTitle">
                                            My Rating
                                        </v-col>
                                        <v-col lg="1" class="columnTitle">
                                            Reading Status
                                        </v-col>
                                        <v-col lg="1" class="columnTitle">
                                            Date Started
                                        </v-col>
                                        <v-col lg="1" class="columnTitle">
                                            Date Finished
                                        </v-col>
                                        <v-col lg="1" class="columnTitle">
                                            Times Read
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                        <!-- Container for User Books -->
                        <v-row v-if="paginatedBooks.length >= 1" no-gutters>
                            <v-col
                                v-for="book in paginatedBooks"
                                :key="book.bookId"
                                cols="12"
                                sm="12"
                                md="12"
                                lg="12"
                            >
                                <v-card class="bookCard" outlined tile>
                                    <v-row>
                                        <v-col lg="1">
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
                                        <!-- clickable Title - route to BookPage w/Book Name + ID -->
                                        <v-col
                                            class="clickableLink"
                                            lg="3"
                                            align-self="center"
                                            @click="
                                                navigateToBookPage(
                                                    book.bookId,
                                                    book.Title
                                                )
                                            "
                                        >
                                            {{ book.Title }}
                                        </v-col>
                                        <v-col
                                            class="clickableLink"
                                            lg="2"
                                            align-self="center"
                                            @click="searchAuthor(book.Author)"
                                        >
                                            {{ book.Author }}
                                        </v-col>
                                        <v-col lg="2" align-self="center">
                                            <!-- show user rating if they've rated book -->
                                            <v-rating
                                                v-if="
                                                    book.Rating ||
                                                    book.Rating === 0
                                                "
                                                :value="parseFloat(book.Rating)"
                                                color="amber"
                                                dense
                                                half-increments
                                                readonly
                                            ></v-rating>
                                            <!-- else show empty rating -->
                                            <v-rating
                                                v-else
                                                :value="0"
                                                color="amber"
                                                dense
                                                half-increments
                                                readonly
                                            ></v-rating>
                                        </v-col>
                                        <v-col lg="1" align-self="center">
                                            <div>
                                                {{ book.Reading_Status }}
                                            </div>
                                        </v-col>
                                        <v-col lg="1" align-self="center">
                                            <div v-if="book.Date_Started">
                                                {{
                                                    formatDate(
                                                        book.Date_Started
                                                    )
                                                }}
                                            </div>
                                        </v-col>
                                        <v-col lg="1" align-self="center">
                                            <div v-if="book.Date_Finished">
                                                {{
                                                    formatDate(
                                                        book.Date_Finished
                                                    )
                                                }}
                                            </div>
                                        </v-col>
                                        <v-col lg="1" align-self="center">
                                            <div v-if="book.Times_Read">
                                                {{ book.Times_Read }}
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>

                    <!-- Only show if tablet/mobile sizing 1000px or less -->
                    <div class="mobileMyBooksContainer">
                        <v-row>
                            <v-col>
                                <v-card
                                    v-for="book in paginatedBooks"
                                    :key="book.bookId"
                                    color="background"
                                    elevation="0"
                                    class="pa-2"
                                >
                                    <v-row align="center" dense>
                                        <v-col cols="3" sm="2">
                                            <v-img
                                                contain
                                                class="bookCoverImg"
                                                :src="book.Cover_Img"
                                            ></v-img>
                                        </v-col>

                                        <v-col cols="9" sm="10">
                                            <v-card-text class="tight-spacing">
                                                <p
                                                    class="bookTitle clickableLink"
                                                    @click="
                                                        navigateToBookPage(
                                                            book.bookId,
                                                            book.Title
                                                        )
                                                    "
                                                >
                                                    {{ book.Title }}
                                                </p>

                                                <p
                                                    class="text-subtitle-2 clickableLink"
                                                    @click="
                                                        searchAuthor(
                                                            book.Author
                                                        )
                                                    "
                                                >
                                                    by {{ book.Author }}
                                                </p>

                                                <div>
                                                    <!-- show user rating if they've rated book -->
                                                    <v-rating
                                                        v-if="
                                                            book.Rating ||
                                                            book.Rating === 0
                                                        "
                                                        :value="
                                                            parseFloat(
                                                                book.Rating
                                                            )
                                                        "
                                                        color="amber"
                                                        small
                                                        dense
                                                        half-increments
                                                        readonly
                                                    ></v-rating>
                                                    <!-- else show empty rating -->
                                                    <v-rating
                                                        v-else
                                                        :value="0"
                                                        color="amber"
                                                        small
                                                        dense
                                                        half-increments
                                                        readonly
                                                    ></v-rating>
                                                </div>

                                                <p>
                                                    Reading Status:
                                                    {{ book.Reading_Status }}
                                                </p>

                                                <p v-if="book.Date_Started">
                                                    Date Started:
                                                    {{
                                                        formatDate(
                                                            book.Date_Started
                                                        )
                                                    }}
                                                </p>

                                                <p v-if="book.Date_Finished">
                                                    Date Finished:
                                                    {{
                                                        formatDate(
                                                            book.Date_Finished
                                                        )
                                                    }}
                                                </p>

                                                <p v-if="book.Times_Read === 0">
                                                    Never read.
                                                </p>
                                                <p v-if="book.Times_Read === 1">
                                                    Read
                                                    {{ book.Times_Read }} time.
                                                </p>
                                                <p v-if="book.Times_Read > 1">
                                                    Read
                                                    {{ book.Times_Read }} times.
                                                </p>
                                            </v-card-text>

                                            <v-divider
                                                class="mx-4 my-1"
                                            ></v-divider>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>

            <!-- Pagination Row-->
            <v-row>
                <v-col cols="12">
                    <v-pagination
                        v-model="currentPage"
                        :length="totalPages"
                        circle
                    ></v-pagination>
                </v-col>
            </v-row>
        </v-container>

        <!-- leaving off here -->
        <!-- NEED TO MOVE ERROR SOMEWHERE ELSE -->
        <div class="errorMsg" v-if="errorMsg">
            {{ errorMsg }}
        </div>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";

    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "MyBooks",
        components: {
            SignedInHeader,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                bookshelfCategories: [
                    {title: "All", param: null},
                    {title: "Read", param: "read"},
                    {title: "Currently Reading", param: "currently reading"},
                    {title: "Want to Read", param: "tbr"},
                ],
                selectedCategory: "",
                books: [],
                errorMsg: "",
                currentPage: 1,
                itemsPerPage: 10,
            };
        },
        computed: {
            totalPages() {
                return Math.ceil(this.books.length / this.itemsPerPage);
            },
            paginatedBooks() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.books.slice(start, end);
            },
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            getMyBooks(category = "") {
                this.selectedCategory = category;

                let config = {
                    url: this.apiUrl + "/user-books",
                    method: "GET",
                    headers: {
                        token: this.token,
                    },
                };

                // Add the readingStatus parameter only if category is not an empty string
                if (category) {
                    config.params = {readingStatus: category};
                }

                axios
                    .request(config)
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

            selectCategory(category) {
                this.getMyBooks(category);
            },
            formatDate(dateStr) {
                if (!dateStr) return "";
                const date = new Date(dateStr);
                const options = {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                };
                return date.toLocaleDateString("en-US", options);
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
            clearError() {
                this.errorMsg = "";
            },
        },
        created() {
            document.title = `${this.$route.params.username}'s books on CloudBookd`; //set page Title based on signed in user
            this.getToken();
            this.getMyBooks();
        },
    };
</script>

<style scoped>
    .pageContent {
        margin-top: 80px;
    }
    .myBooksContainer {
        display: none; /* Hide on smaller screens */
    }

    .mobileMyBooksContainer {
        display: block; /* Show on smaller screens */
        margin-top: 60px;
    }
    .columnTitle {
        color: #6e4b6a;
        font-weight: 600;
    }
    .header {
        color: #6e4b6a;
        font-family: lemon;
        font-size: 17pt;
        font-weight: bold;
    }
    .listContainer {
        border-radius: 10px;
        background-color: #f7edf0;
    }
    .bookCard {
        padding: 5px;
    }
    .bookCoverImg {
        width: 80px;
        cursor: pointer;
    }
    .clickableLink:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    .tight-spacing p,
    .tight-spacing div {
        margin-top: 0;
        margin-bottom: 0rem;
    }

    .fit-content {
        height: fit-content;
    }

    .errorMsg {
        font-size: 10pt;
        color: red;
    }
    @media (min-width: 600px) {
        .mobileMyBooksContainer {
            margin-top: 0px;
        }
    }
    @media (min-width: 1000px) {
        .pageContent {
            max-width: 1000px;
            margin-top: 25px;
        }
        .myBooksContainer {
            display: block; /* Show on larger screens */
        }

        .mobileMyBooksContainer {
            display: none; /* Hide on larger screens */
        }
        .header {
            font-size: 22pt;
            margin: 0 0 15px 50px;
        }
    }
    @media (min-width: 1500px) {
        .pageContent {
            max-width: 1400px;
            margin-top: 25px;
        }
        .bookCoverImg {
            width: 100px;
        }
    }
</style>
