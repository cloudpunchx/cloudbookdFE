<template>
    <div>
        <NotSignedInHeader />

        <v-container class="pageContent">
            <v-row>
                <v-col>
                    <v-card
                        max-width="500"
                        elevation="24"
                        class="mx-auto"
                        color="lavender"
                    >
                        <v-card-actions class="justify-end">
                            <v-btn plain dark @click="toggleForm(true)"
                                >LOG IN</v-btn
                            >
                            <v-btn plain dark @click="toggleForm(false)"
                                >SIGN UP</v-btn
                            >
                        </v-card-actions>

                        <LoginForm v-if="login" />
                        <SignupForm v-if="!login" />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import NotSignedInHeader from "@/components/NotSignedInHeader.vue";
    import LoginForm from "../components/LoginForm.vue";
    import SignupForm from "../components/SignupForm.vue";

    export default {
        name: "AccessPage",
        components: {
            NotSignedInHeader,
            LoginForm,
            SignupForm,
        },
        data() {
            return {
                login: true,
            };
        },
        methods: {
            toggleForm(isLogin) {
                this.login = isLogin;
            },
        },
    };
</script>

<style scoped>
    .pageContent {
        margin-top: 100px;
    }

    .v-card {
        border-radius: 10px;
    }

    @media (min-width: 500px) {
        .pageContent {
            width: 90vw;
        }
        .sideImg {
            width: 40vw;
        }
    }

    @media (min-width: 1000px) {
        .pageContent {
            max-width: 900px;
        }
        .sideImg {
            width: 350px;
        }
    }

    @media (min-width: 1500px) {
        .pageContainer {
            max-width: 1000px;
        }
    }
</style>
