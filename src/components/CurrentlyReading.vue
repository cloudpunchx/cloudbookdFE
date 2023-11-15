<template>
    <div>
        <v-container style="background-color: #c9a2c7">
            <v-row no-gutters>
                <v-co>
                    <p class="header">Currently Reading</p>
                    <v-card class="my-6 pa-1" color="background">
                        <!-- might want to remove this no-gutters -->
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
                                <v-card-title class="bookTitle"
                                    >The Dark Tower: The Gunslinger
                                    Born</v-card-title
                                >

                                <v-card-text>
                                    <v-row align="center" class="mx-0">
                                        <div class="text-subtitle-2">
                                            by Peter David, Stephen King
                                        </div>

                                        <!-- GET user progress, show on bar w % (vuetify)-->
                                        <v-progress-linear
                                            v-model="skill"
                                            color="secondary"
                                            height="15"
                                        >
                                            <template v-slot:default="{value}">
                                                <strong
                                                    >{{
                                                        Math.ceil(value)
                                                    }}%</strong
                                                >
                                            </template>
                                        </v-progress-linear>
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
                    </v-card>
                </v-co>
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
    /* NOT STYLED YET */
    .header {
        font-family: lobster;
        color: white;
        font-size: 18pt;
    }

    .bookTitle {
        font-family: open-sans-regular;
        font-size: 16pt;
    }

    .bookCoverImg {
        width: 100px;
    }
</style>
