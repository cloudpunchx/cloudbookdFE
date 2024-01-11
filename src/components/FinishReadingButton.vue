<template>
    <div>
        <v-btn @click="dialog = true" color="primary" text>
            Mark As Read
        </v-btn>

        <v-dialog v-model="dialog" persistent max-width="600">
            <v-card class="dialog-content" color="lavender" rounded="lg">
                <v-row>
                    <v-col
                        class="d-flex flex-column justify-center align-center"
                    >
                        <v-card-title class="cardTitle">
                            Finished Reading {{ bookTitle }}?
                        </v-card-title>

                        <div class="d-flex justify-center">
                            <!-- Rating - out of 5, optional -->
                            <v-rating
                                v-model="userRating"
                                size="25"
                                color="amber"
                                background-color="whitesmoke"
                                hover
                                dense
                                half-increments
                            ></v-rating>
                        </div>

                        <div class="d-flex justify-center">
                            <!-- Date Finished Picker - optional-->
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{on, attrs}">
                                    <v-text-field
                                        v-model="dateFinished"
                                        label="Date Finished (optional)"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="dateFinished"
                                    no-title
                                    scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(dateFinished)"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </div>

                        <div class="errorMsg" v-if="errorMsg">
                            {{ errorMsg }}
                        </div>

                        <v-card-actions class="d-flex justify-center">
                            <v-btn color="primary" text @click="dialog = false">
                                Close
                            </v-btn>
                            <v-btn
                                color="primary"
                                text
                                @click="markBookFinished"
                            >
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "FinishReadingButton",
        props: {
            bookId: String,
            bookTitle: String,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                menu: false,
                errorMsg: "",
                dialog: false, // For controlling the visibility of the dialog
                // dateStarted: "", // For the date started input - MIGHT PUT THIS BACK IN LATER ON
                dateFinished: "", // For the date finished input
                userRating: 0, // For v-rating
            };
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            markBookFinished() {
                axios
                    .request({
                        url: this.apiUrl + "/user-books",
                        method: "PATCH",
                        headers: {
                            token: this.token,
                        },
                        data: {
                            bookId: this.bookId,
                            readingStatus: "read",
                            // dateStarted: this.dateStarted,
                            dateFinished: this.dateFinished,
                            rating: this.userRating,
                        },
                    })
                    .then((response) => {
                        console.log(response);
                        this.dialog = false; // Close the dialog after updating
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        // Set a timeout to clear the error after 1 minute
                        setTimeout(() => {
                            this.clearError();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    });
            },
            clearError() {
                this.errorMsg = "";
            },
        },
        created() {
            this.getToken();
        },
    };
</script>

<style scoped>
    .cardTitle {
        color: white;
    }
    .dialog-content {
        overflow: hidden; /* This will hide the scroll bars */
    }

    .errorMsg {
        font-size: 10pt;
        color: red;
    }
</style>
