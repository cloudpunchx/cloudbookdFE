<template>
    <!-- Signup Form Container -->
    <v-container class="formContainer">
        <v-form ref="form" v-model="valid" lazy-validation class="text-center">
            <v-container>
                <v-row>
                    <v-col>
                        <h1 class="heading">Sign Up for Cloudbookd</h1>

                        <v-text-field
                            required
                            v-model="username"
                            label="Username"
                            color="primary"
                            outlined
                            dense
                            :dark="
                                $vuetify.breakpoint.width >= 600 ? true : false
                            "
                        ></v-text-field>

                        <v-text-field
                            v-model="firstName"
                            :rules="nameRules"
                            label="First Name"
                            required
                            color="primary"
                            outlined
                            dense
                            :dark="
                                $vuetify.breakpoint.width >= 600 ? true : false
                            "
                        ></v-text-field>

                        <v-text-field
                            v-model="lastName"
                            :rules="nameRules"
                            label="Last Name"
                            required
                            color="primary"
                            outlined
                            dense
                            :dark="
                                $vuetify.breakpoint.width >= 600 ? true : false
                            "
                        ></v-text-field>

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
                            @click:append="show1 = !show1"
                        ></v-text-field>

                        <!-- Set up checkbox and test with back end to confirm sign up -->
                        <v-checkbox
                            v-model="agreeTOS"
                            color="primary"
                            :dark="
                                $vuetify.breakpoint.width >= 600 ? true : false
                            "
                            dense
                            label="Confirm Sign Up"
                        >
                        </v-checkbox>

                        <!-- Submit Button -->
                        <v-btn
                            text
                            :dark="
                                $vuetify.breakpoint.width >= 600 ? true : false
                            "
                            class="submitBtn"
                            @click="userSignUp"
                            >Submit</v-btn
                        >

                        <div class="errorMsg" v-if="errorMsg">
                            {{ errorMsg }}
                        </div>
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
        name: "SignupForm",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                userId: null,
                valid: true,
                isMobile: false,
                username: "",
                firstName: "",
                lastName: "",
                nameRules: [
                    (v) => !!v || "Name is required",
                    (v) =>
                        v.length <= 10 ||
                        "Name must be less than 10 characters",
                ],
                email: "",
                emailRules: [
                    (v) => !!v || "E-mail is required",
                    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
                ],
                show1: false,
                password: "",
                rules: {
                    required: (value) => !!value || "Required.",
                    min: (v) => v.length >= 8 || "Min 8 characters",
                    emailMatch: () =>
                        `The email and password you entered don't match`,
                },
                agreeTOS: false,
                errorMsg: "",
            };
        },
        computed: {
            isFormValid() {
                // Return true if all required fields are filled and terms are agreed
                return (
                    this.firstName &&
                    this.lastName &&
                    this.username &&
                    this.email &&
                    this.password
                );
            },
        },
        methods: {
            userSignUp() {
                if (this.agreeTOS == false) {
                    this.feedbackMsg =
                        "Please click check box to agree to terms and conditions.";
                } else {
                    axios
                        .request({
                            url: this.apiUrl + "/user",
                            method: "POST",
                            data: {
                                username: this.username,
                                firstName: this.firstName,
                                lastName: this.lastName,
                                email: this.email,
                                password: this.password,
                            },
                        })
                        .then((response) => {
                            cookies.set(`userId`, response.data[0]);
                            cookies.set(`sessionToken`, response.data[1]);
                            router.push({
                                name: "HomePage",
                            });
                        })
                        .catch((error) => {
                            this.errorMsg = error.response.data;
                            // Set a timeout to clear the error after 1 minute
                            setTimeout(() => {
                                this.clearResponse();
                            }, 60000); // 1 minute = 60,000 milliseconds
                        });
                }
            },
            clearResponse() {
                this.errorMsg = "";
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

    .errorMsg {
        font-size: 10pt;
        color: red;
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
