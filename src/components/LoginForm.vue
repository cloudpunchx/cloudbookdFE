<template>
    <!-- Log In Form Container -->
    <v-container class="formContainer">
        <v-form ref="form" v-model="valid" lazy-validation class="text-center">
            <v-container>
                <v-row>
                    <v-col>
                        <h1 class="heading">Log in to Cloudbookd</h1>

                        <!-- Email Text Field -->
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            color="primary"
                            outlined
                            dense
                            dark
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
                            dark
                            @click:append="show1 = !show1"
                        ></v-text-field>

                        <!-- Submit Button -->
                        <v-btn text dark class="submitBtn" @click="userLogin"
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
                },
                errorMsg: "",
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
                        cookies.set(`sessionToken`, response.data[1]);
                        router.push("/home");
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
            },
        },
    };
</script>

<style scoped>
    .heading {
        color: #c0c0c0;
        font-size: 11pt;
        font-weight: bold;
        margin-bottom: 15px;
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
