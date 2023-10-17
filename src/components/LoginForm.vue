<template>
    <!-- Log In Form Container -->
    <v-container class="formContainer">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="secondary text-center rounded-tl-xl"
        >
            <v-container>
                <v-row>
                    <v-col>
                        <!-- Email Text Field -->
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

                        <!-- Submit Button -->
                        <v-btn :disabled="!valid" @click="login">
                            Log In
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: "LoginForm",
        data() {
            return {
                valid: true,
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
        methods: {},
    };
</script>

<style scoped>
    @media (min-width: 500px) {
        .formContainer {
            max-width: 400px;
        }
    }

    @media (min-width: 1500px) {
        .formContainer {
            max-width: 500px;
        }
    }
</style>
