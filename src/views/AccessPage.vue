<template>
    <v-container class="pageContainer">
        <v-row>
            <v-col>
                <v-img
                    src="../assets/cloudbookdLogo.png"
                    width="250"
                    class="mx-auto"
                >
                </v-img>

                <v-tabs fixed-tabs v-model="tab" class="tabContainer">
                    <v-tab>Log In</v-tab>

                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <LoginForm />
                        </v-tab-item>

                        <v-tab-item>
                            <SignupForm />
                        </v-tab-item>
                    </v-tabs-items>

                    <v-tab>Sign Up</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import LoginForm from "../components/LoginForm.vue";
    import SignupForm from "../components/SignupForm.vue";

    export default {
        name: "AccessPage",
        components: {
            LoginForm,
            SignupForm,
        },
        data() {
            return {
                tab: null,
            };
        },
    };
</script>

<style scoped>
    @media (min-width: 500px) {
        .pageContainer {
            max-width: 450px;
        }

        .tabContainer {
            margin-top: 25px;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
                rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        }
    }

    @media (min-width: 1500px) {
        .pageContainer {
            max-width: 550px;
        }
    }
</style>
