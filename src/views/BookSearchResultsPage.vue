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
                                <v-btn color="primary" class="searchBtn" rounded
                                    >Search</v-btn
                                >
                            </v-col>
                        </v-row>
                    </v-card>

                    <!-- Search Results container -->
                    <v-card
                        max-width="500"
                        color="lavender"
                        elevation="0"
                        class="pa-2 mt-4"
                    >
                        <v-row align="center" no-gutters>
                            <v-col cols="3">
                                <v-img
                                    contain
                                    class="bookCoverImg"
                                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1489721554i/342445.jpg"
                                ></v-img>
                            </v-col>

                            <v-col>
                                <v-card-text>
                                    <p class="bookTitle">
                                        The Dark Tower: The Gunslinger Born
                                    </p>
                                    <p class="text-subtitle-2">
                                        by Peter David, Stephen King
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

    export default {
        name: "BookSearchResultsPage",
        components: {
            SignedInHeader,
        },
        data() {
            return {
                query: "",
            };
        },
        created() {
            document.title = `Search results for ${this.query} | CloudBookd`;
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
