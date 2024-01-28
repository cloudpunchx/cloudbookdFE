<template>
    <div>
        <v-container class="pageContent" fluid>
            <v-row>
                <!-- first col with logo and about -->
                <v-col cols="12" sm="5" md="5" lg="5" class="purpleContainer">
                    <v-card
                        elevation="0"
                        color="transparent"
                        class="purpleContent mx-auto"
                    >
                        <!-- site Logo -->
                        <router-link to="/">
                            <v-img
                                src="../assets/cloudbookdLogo.png"
                                alt="Cloudbookd Logo"
                                class="siteLogo"
                            ></v-img>
                        </router-link>

                        <!-- brief about section -->
                        <ul class="aboutSection">
                            <li>Welcome to your solo reading journey.</li>
                            <li>
                                Track the books you've read, want to read, and
                                currently reading.
                            </li>
                            <li>Set a yearly reading challenge goal.</li>
                        </ul>
                        <v-img
                            src="../assets/ghostMoon.png"
                            alt="Ghost sitting on crescent moon, reading a book."
                            class="ghostMoonImg"
                        ></v-img>
                    </v-card>
                </v-col>

                <!-- 2nd col with login/signup card -->
                <v-col cols="12" sm="7" md="7" lg="7" class="loginContainer">
                    <v-card
                        elevation="24"
                        color="deep_purple"
                        class="formsCard mx-auto"
                        shaped
                    >
                        <!-- login / signup form toggle -->
                        <v-card-actions class="justify-end">
                            <v-btn
                                :class="{active: isActiveLogin}"
                                plain
                                dark
                                @click="toggleForm(true)"
                                >LOG IN</v-btn
                            >
                            <v-btn
                                :class="{active: isActiveSignUp}"
                                plain
                                dark
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
        background-color: #13022c;
    }

    .purpleContent {
        padding: 20px;
    }

    .aboutSection {
        color: #c0c0c0;
        font-size: 11pt;
        font-weight: bold;
        padding: 0;
        margin-top: 20px;
        list-style-type: none;
    }

    .ghostMoonImg {
        max-width: 600px;
        margin-top: 25px;
    }

    .loginContainer {
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
