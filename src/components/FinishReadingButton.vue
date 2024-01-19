<template>
    <div>
        <v-btn @click="dialog = true" color="lavender" dark elevation="0">
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

                        <div class="responseMsg" v-if="responseMsg">
                            {{ responseMsg }}
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
    import {EventBus} from "@/eventBus";

    export default {
        name: "FinishReadingButton",
        props: {
            bookId: String,
            bookTitle: String,
            isOnHomePage: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                menu: false,
                responseMsg: "",
                errorMsg: "",
                dialog: false, // For controlling the visibility of the dialog
                dateFinished: "",
                userRating: 0,
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
                            dateFinished: this.dateFinished,
                            rating: this.userRating,
                        },
                    })
                    .then((response) => {
                        this.responseMsg = response.data;
                        this.dialog = false; // Close the dialog after updating
                        // Emit the event only if this button is on the homepage
                        if (this.isOnHomePage) {
                            EventBus.$emit("bookFinished");
                        }
                        // Set a timeout to clear the response after 1 minute
                        setTimeout(() => {
                            this.clearResponse();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        // Set a timeout to clear the error after 1 minute
                        setTimeout(() => {
                            this.clearResponse();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    });
            },
            clearResponse() {
                this.errorMsg = "";
                this.responseMsg = "";
            },
        },
        created() {
            this.getToken();
        },
    };
</script>

<style scoped>
    .v-btn {
        font-size: 9pt;
    }
    .cardTitle {
        color: white;
    }
    .dialog-content {
        overflow: hidden; /* hide the scroll bars */
    }
    .responseMsg {
        margin-left: 20px;
    }
    .errorMsg {
        font-size: 10pt;
        color: red;
        margin-left: 20px;
    }

    @media (min-width: 1000px) {
        .v-btn {
            font-size: 12pt;
        }
    }
</style>
