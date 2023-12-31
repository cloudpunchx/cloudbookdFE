<template>
    <div>
        <v-container class="pageContent" fluid>
            <v-row>
                <!-- Left side with logo and about -->
                <v-col cols="12" sm="5" md="5" lg="5" class="purpleContainer">
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

                        <!-- about section -->
                        <ul class="aboutSection">
                            <li>Welcome to your solo reading journey.</li>
                            <li>
                                Track the books you've read, want to read, and
                                currently reading.
                            </li>
                            <li>Set a yearly reading challenge goal.</li>
                        </ul>
                        <v-img
                            src="../assets/skeletonReading.png"
                            class="skeletonImg"
                        ></v-img>
                    </v-card>
                </v-col>

                <!-- Right side with login/signup card -->
                <v-col cols="12" sm="7" md="7" lg="7" class="loginContainer">
                    <v-card
                        elevation="24"
                        :color="
                            $vuetify.breakpoint.width >= 600
                                ? 'lavender'
                                : 'background'
                        "
                        class="formsCard mx-auto"
                    >
                        <!-- login / signup form toggle -->
                        <v-card-actions class="justify-end">
                            <v-btn
                                plain
                                color="primary"
                                :dark="
                                    $vuetify.breakpoint.width >= 600
                                        ? true
                                        : false
                                "
                                @click="toggleForm(true)"
                                >LOG IN</v-btn
                            >
                            <v-btn
                                plain
                                color="primary"
                                :dark="
                                    $vuetify.breakpoint.width >= 600
                                        ? true
                                        : false
                                "
                                @click="toggleForm(false)"
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
    .siteLogo {
        width: 100%;
        max-width: 200px;
        margin-top: 20px;
    }

    .purpleContainer {
        background-color: #c9a2c7;
    }

    .purpleContent {
        padding: 20px;
    }

    .aboutSection {
        color: #6e4b6a;
        font-size: 11pt;
        font-weight: bold;
        padding: 0;
        margin-top: 20px;
        list-style-type: none;
    }

    .skeletonImg {
        width: 100%;
        max-width: 100vw;
    }

    .loginContainer {
        background: linear-gradient(to bottom, #c9a2c7, #f7edf0);
        max-height: 100vh;
    }

    .formsCard {
        max-width: 90%;
        margin-bottom: 400px;
    }

    @media (min-width: 500px) {
        .siteLogo {
            max-width: 250px;
        }

        .purpleContainer {
            background-color: #c9a2c7;
        }
    }

    @media (min-width: 600px) {
        .purpleContainer {
            min-height: 100vh;
            display: flex;
        }
        .loginContainer {
            background: none;
            background-color: transparent;
        }
        .formsCard {
            max-width: 80%;
            margin-top: 20%;
        }
    }

    @media (min-width: 1000px) {
        .siteLogo {
            max-width: 300px;
            margin-top: 0;
        }

        .purpleContainer {
            align-items: center;
        }

        .aboutSection {
            font-size: 15pt;
        }

        .formsCard {
            max-width: 50%;
        }
    }
</style>
