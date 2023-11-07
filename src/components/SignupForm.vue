<template>
    <!-- Signup Form Container -->
    <v-container class="formContainer">
        <v-form ref="form" v-model="valid" lazy-validation class="text-center">
            <v-container>
                <v-row>
                    <!-- Side Image only visible over 500px screen -->
                    <v-col v-if="!isMobile">
                        <v-img
                            src="../assets/books3.jpg"
                            class="sideImg mx-auto rounded-l-xl"
                        ></v-img>
                        <p class="text-caption font-weight-light white--text">
                            Image by
                            <a
                                href="https://www.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_24307396.htm#query=books&position=5&from_view=search&track=sph"
                                class="text-decoration-none white--text"
                                >Freepik</a
                            >
                        </p>
                    </v-col>

                    <v-col>
                        <p
                            class="font-weight-bold white--text text-lg-h6 text-xl-h5 heading"
                        >
                            Sign Up
                        </p>

                        <v-text-field
                            required
                            v-model="username"
                            label="Username"
                            color="primary"
                            dark
                        ></v-text-field>

                        <v-text-field
                            v-model="firstName"
                            :rules="nameRules"
                            :counter="10"
                            label="First Name"
                            required
                            color="primary"
                            dark
                        ></v-text-field>

                        <v-text-field
                            v-model="lastName"
                            :rules="nameRules"
                            :counter="10"
                            label="Last Name"
                            required
                            color="primary"
                            dark
                        ></v-text-field>

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

                        <!-- Set up checkbox and test with back end to confirm sign up -->
                        <v-checkbox
                            v-model="agreeTOS"
                            color="primary"
                            dark
                            label="Confirm Sign Up"
                        >
                        </v-checkbox>

                        <!-- Submit Button -->
                        <v-btn @click="userSignUp">Submit</v-btn>

                        <div v-if="feedbackMsg">
                            <p class="feedbackMsg">{{ feedbackMsg }}</p>
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
                feedbackMsg: "",
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
            checkWindowSize() {
                this.isMobile = window.innerWidth <= 500; // Update isMobile based on window width
            },
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
                            this.feedbackMsg = error.response.data;
                            this.clearTextBox();
                        });
                }
            },
            clearTextBox() {
                this.username = "";
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.username = "";
                this.password = "";
            },
        },
        mounted() {
            this.checkWindowSize(); // Call the method when the component is mounted
            window.addEventListener("resize", this.checkWindowSize); // Add event listener for window resize
            setTimeout(() => {
                this.feedbackMsg = "";
            }, 60000); // Hide after 1 minute
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.checkWindowSize); // Remove event listener on component destroy
            this.feedbackMsg = "";
        },
    };
</script>

<style scoped>
    .heading {
        font-family: Arial, Helvetica, sans-serif;
    }

    @media (min-width: 500px) {
        .sideImg {
            width: 40vw;
        }
    }

    @media (min-width: 1000px) {
        .sideImg {
            width: 400px;
        }
    }

    @media (min-width: 1500px) {
        .sideImg {
            width: 460px;
        }
    }
</style>
