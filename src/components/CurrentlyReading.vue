<template>
    <div>
        <v-container class="pageContent">
            <v-row>
                <v-col>
                    <p class="header">Currently Reading</p>
                    <v-card color="background" elevation="0" class="pa-2">
                        <v-row align="center" no-gutters>
                            <!-- need to play around with cols and set for breakpoints -->
                            <v-col cols="3">
                                <v-img
                                    contain
                                    class="bookCoverImg"
                                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1489721554i/342445.jpg"
                                ></v-img>
                            </v-col>

                            <v-col>
                                <p class="bookTitle mx-2">
                                    The Dark Tower: The Gunslinger Born
                                </p>

                                <v-card-text>
                                    <v-row align="center" class="mx-0">
                                        <div class="text-subtitle-2">
                                            by Peter David, Stephen King
                                        </div>
                                    </v-row>
                                </v-card-text>

                                <v-divider class="mx-4 my-1"></v-divider>

                                <v-card-actions>
                                    <!-- this btn will take you to reading update page -->
                                    <v-btn color="primary" text>
                                        Update Progress
                                    </v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                    </v-card>

                    <v-card color="background" elevation="0" class="pa-2">
                        <v-row align="center" no-gutters>
                            <!-- need to play around with cols and set for breakpoints -->
                            <v-col cols="3">
                                <v-img
                                    contain
                                    class="bookCoverImg"
                                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1377304780i/3217221.jpg"
                                ></v-img>
                            </v-col>

                            <v-col>
                                <p class="bookTitle mx-2">
                                    Locke & Key: Welcome to Lovecraft
                                </p>

                                <v-card-text>
                                    <v-row align="center" class="mx-0">
                                        <div class="text-subtitle-2">
                                            by Joe Hill
                                        </div>
                                    </v-row>
                                </v-card-text>

                                <v-divider class="mx-4 my-1"></v-divider>

                                <v-card-actions>
                                    <!-- this btn will take you to reading update page -->
                                    <v-btn color="primary" text>
                                        Update Progress
                                    </v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "CurrentlyReading",
        data() {
            return {};
        },
        methods: {},
    };
</script>

<style scoped>
    .pageContent {
        background-color: #f7edf0;
    }
    /* NOT STYLED YET */
    .header {
        font-family: open-sans-regular;
        font-size: 14pt;
    }

    .bookTitle {
        font-size: 12pt;
    }

    .bookCoverImg {
        width: 80px;
    }

    @media (min-width: 500px) {
    }

    @media (min-width: 1000px) {
        .header {
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
