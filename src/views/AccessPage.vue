<template>
    <div>
        <v-container class="pageContainer">
            <v-row>
                <v-col>
                    <!-- Should move this Logo to it's own Component -->
                    <v-img
                        src="../assets/cloudbookdBlk.png"
                        width="200"
                        class="siteLogo mx-auto"
                    >
                    </v-img>

                    <!-- Tabs for Log In / Sign Up components -->
                    <v-tabs fixed-tabs v-model="tab" class="tabContainer">
                        <!-- Tab 1 - Log In -->
                        <v-tab>Log In</v-tab>

                        <!-- Tab 2 Sign Up -->
                        <v-tab>Sign Up</v-tab>

                        <v-tabs-items v-model="tab">
                            <v-tab-item>
                                <LoginForm />
                            </v-tab-item>

                            <v-tab-item>
                                <SignupForm />
                            </v-tab-item>
                        </v-tabs-items>
                    </v-tabs>
                </v-col>
            </v-row>
        </v-container>
    </div>
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
    .siteLogo {
        margin-bottom: 25px;
    }

    @media (min-width: 500px) {
        .pageContainer {
            width: 90vw;
        }

        .tabContainer {
            box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
                rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        }
    }

    @media (min-width: 1000px) {
        .pageContainer {
            max-width: 900px;
        }
    }

    @media (min-width: 1500px) {
        .pageContainer {
            max-width: 1000px;
        }
    }
</style>
