<template>
    <div>
        <v-container class="pageContent" fluid>
            <v-row>
                <!-- Left side with logo and about -->
                <v-col cols="12" sm="6" md="6" class="purpleContainer">
                    <v-card
                        elevation="0"
                        color="lavender"
                        class="purpleContent mx-auto"
                    >
                        <!-- Logo -->
                        <router-link to="/test">
                            <v-img
                                src="../assets/cloudbookdLogo1.png"
                                class="siteLogo"
                            ></v-img>
                        </router-link>
                        <p class="aboutSection">
                            Welcome to your solo reading journey.
                        </p>
                        <p class="aboutSection">Track your reading...</p>
                        <v-img
                            src="../assets/skeletonReading.png"
                            class="skeletonImg"
                        ></v-img>
                    </v-card>
                </v-col>

                <!-- Right side with login/signup card -->
                <v-col cols="12" sm="6" md="6">
                    <v-card
                        max-width="500"
                        elevation="24"
                        color="lavender"
                        class="formsCard mx-auto"
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
    import LoginForm from "../components/LoginForm.vue";
    import SignupForm from "../components/SignupForm.vue";

    export default {
        name: "LandingPage",
        components: {
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
        margin: 0;
        padding: 0;
    }

    .siteLogo {
        width: 200px;
        margin-bottom: 20px;
    }

    .purpleContainer {
        background-color: #c9a2c7;
        color: white;
        min-height: 100vh;
        display: flex;
    }

    .purpleContent {
        padding: 20px;
    }

    .aboutSection {
        color: #6e4b6a;
        font-size: 18px;
        font-weight: bold;
        margin-top: 20px;
    }

    .skeletonImg {
        width: 400px;
    }

    .formsCard {
        margin-top: 200px;
    }

    @media (min-width: 500px) {
        .siteLogo {
            width: 300px;
        }
    }

    @media (min-width: 1000px) {
        .siteLogo {
            width: 300px;
        }

        .purpleContainer {
            align-items: center;
        }
    }

    @media (min-width: 1500px) {
        .siteLogo {
            width: 300px;
        }
    }
</style>
