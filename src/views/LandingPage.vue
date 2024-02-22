<template>
    <div>
        <v-container class="pageContent" fluid>
            <v-row>
                <!-- first col with logo and about -->
                <v-col cols="12" sm="12" md="5" lg="5" class="purpleContainer">
                    <stars-component></stars-component>
                    <div class="contentWrapper">
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
                                    Track your to be read, current reads and
                                    history.
                                </li>
                                <li>
                                    Set and track your annual reading goals.
                                </li>
                            </ul>
                            <v-img
                                src="../assets/ghostMoon.png"
                                alt="Ghost sitting on crescent moon, reading a book."
                                class="ghostMoonImg"
                            ></v-img>
                        </v-card>
                    </div>
                </v-col>

                <!-- 2nd col with login/signup card -->
                <v-col
                    cols="12"
                    sm="12"
                    md="7"
                    lg="7"
                    class="loginContainer d-flex justify-center align-center"
                >
                    <v-card
                        elevation="24"
                        color="background"
                        class="formsCard"
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
    import StarsComponent from "@/components/StarsComponent.vue";

    export default {
        name: "LandingPage",
        components: {
            LoginForm,
            SignupForm,
            StarsComponent,
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
    .purpleContainer {
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #13022c;
    }

    .contentWrapper {
        position: relative;
        z-index: 2;
    }

    .siteLogo,
    .aboutSection,
    .ghostMoonImg {
        position: relative;
        z-index: 1;
    }

    .siteLogo {
        max-width: 200px;
        margin-top: 20px;
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
        max-width: 200px;
        margin-top: 25px;
    }
    .loginContainer {
        background-color: #d0cadb;
    }
    .formsCard {
        width: 50vw;
        min-width: 300px;
        max-width: 550px;
        margin: 25px 0 200px;
    }

    @media (min-width: 960px) {
        .purpleContainer {
            min-height: 100vh;
        }
        .formsCard {
            margin: 0 0 0;
        }
    }

    @media (min-width: 1000px) {
        .siteLogo {
            max-width: 300px;
            margin-top: 0;
        }
        .aboutSection {
            font-size: 15pt;
        }
        .ghostMoonImg {
            max-width: 300px;
        }
    }

    @media (min-width: 2000px) {
        .siteLogo {
            max-width: 350px;
            margin-top: 0;
        }
        .aboutSection {
            font-size: 18pt;
        }
        .ghostMoonImg {
            max-width: 500px;
        }
    }
</style>
