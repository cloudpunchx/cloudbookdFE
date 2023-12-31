<template>
    <!-- Log In Form Container -->
    <v-container class="formContainer">
        <v-form ref="form" v-model="valid" lazy-validation class="text-center">
            <v-container>
                <v-row>
                    <v-col>
                        <p class="heading">Log in to Cloudbookd</p>

                        <!-- Email Text Field -->
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            color="primary"
                            outlined
                            dense
                            :dark="
                                $vuetify.breakpoint.width >= 600 ? true : false
                            "
                            class="textInput"
                        ></v-text-field>

                        <!-- Password Text Field -->
                        <v-text-field
                            v-model="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Password"
                            hint="At least 8 characters"
                            counter
                            color="primary"
                            outlined
                            dense
                            :dark="
                                $vuetify.breakpoint.width >= 600 ? true : false
                            "
                            class="textInput"
                            @click:append="show1 = !show1"
                        ></v-text-field>

                        <!-- Submit Button -->
                        <v-btn
                            text
                            :dark="
                                $vuetify.breakpoint.width >= 600 ? true : false
                            "
                            class="submitBtn"
                            @click="userLogin"
                            >Submit</v-btn
                        >
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-container>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import router from "@/router";

    export default {
        name: "LoginForm",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                valid: true,
                isMobile: false,
                show1: false,
                password: "",
                email: "",
                emailRules: [
                    (v) => !!v || "E-mail is required",
                    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
                ],
                rules: {
                    required: (value) => !!value || "Required.",
                    min: (v) => v.length >= 8 || "Min 8 characters",
                    emailMatch: () =>
                        `The email and password you entered don't match`,
                },
            };
        },
        methods: {
            userLogin() {
                axios
                    .request({
                        url: this.apiUrl + "/user-login",
                        method: "POST",
                        data: {
                            email: this.email,
                            password: this.password,
                        },
                    })
                    .then((response) => {
                        cookies.set(`userId`, response.data[0]);
                        // COULD DELETE ARGS IF ISSUES ARISE
                        cookies.set(
                            `sessionToken`,
                            response.data[1],
                            "7d",
                            null,
                            null,
                            true
                        );
                        router.push("/home");
                    })
                    // MIGHT HAVE TO FIX THIS ERROR/THESE STRING UPDATES?
                    .catch((error) => {
                        this.email = "";
                        this.password = "";
                        this.feedbackMsg = error.response.data;
                    });
            },
        },
    };
</script>

<style scoped>
    .heading {
        color: #6e4b6a;
        font-size: 11pt;
        font-weight: bold;
    }

    .submitBtn {
        font-size: 11pt;
    }

    @media (min-width: 500px) {
        .heading {
            font-size: 13pt;
        }
        .submitBtn {
            font-size: 13pt;
        }
    }

    @media (min-width: 1000px) {
        .heading {
            font-size: 15pt;
        }
    }
</style>
