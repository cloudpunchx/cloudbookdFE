<template>
    <!-- Log In Form Container -->
    <v-container class="formContainer">
        <v-form ref="form" v-model="valid" lazy-validation class="text-center">
            <v-container>
                <v-row>
                    <!-- Side Image only visible over 500px screen -->
                    <v-col v-if="!isMobile">
                        <v-img
                            src="../assets/readMoreBooks.png"
                            class="sideImg mx-auto rounded-l-xl"
                        ></v-img>
                    </v-col>

                    <v-col>
                        <p class="text-lg-h6 text-xl-h5 heading">Log In</p>

                        <!-- Email Text Field -->
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            color="primary"
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
                            dark
                            @click:append="show1 = !show1"
                        ></v-text-field>

                        <!-- Submit Button -->
                        <v-btn @click="userLogin" rounded>Submit</v-btn>
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
            checkWindowSize() {
                this.isMobile = window.innerWidth <= 500; // Update isMobile based on window width
            },
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
        mounted() {
            this.checkWindowSize(); // Call the method when the component is mounted
            window.addEventListener("resize", this.checkWindowSize); // Add event listener for window resize
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.checkWindowSize); // Remove event listener on component destroy
        },
    };
</script>

<style scoped>
    .heading {
        font-family: open-sans-regular;
        color: whitesmoke;
    }

    @media (min-width: 500px) {
        .sideImg {
            width: 200px;
        }
    }

    @media (min-width: 1000px) {
        .sideImg {
            width: 250px;
        }
    }
</style>
