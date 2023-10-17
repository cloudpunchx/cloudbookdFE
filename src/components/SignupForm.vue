<template>
    <!-- Signup Form Container -->
    <v-container class="formContainer">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="secondary text-center"
        >
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="firstname"
                            :rules="nameRules"
                            :counter="10"
                            label="First Name"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="lastname"
                            :rules="nameRules"
                            :counter="10"
                            label="Last Name"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
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
                            @click:append="show1 = !show1"
                        ></v-text-field>

                        <!-- Set up checkbox and test with back end to confirm sign up -->
                        <v-checkbox
                            v-model="agreeTOS"
                            color="primary"
                            label="Confirm Sign Up"
                        >
                        </v-checkbox>

                        <!-- Submit Button -->
                        <v-btn :disabled="!valid" @click="signup">
                            Sign Up
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: "SignupForm",
        data() {
            return {
                valid: true,
                firstname: "",
                lastname: "",
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
            };
        },
        methods: {},
    };
</script>

<style scoped></style>
