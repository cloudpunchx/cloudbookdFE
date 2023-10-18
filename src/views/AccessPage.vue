<template>
    <div>
        <PageHeader />

        <v-container class="pageContent">
            <v-row>
                <v-col>
                    <v-card class="mx-auto" color="tearose">
                        <v-card-actions>
                            <v-btn plain @click="toggleForm(true)"
                                >LOG IN</v-btn
                            >
                            <v-btn plain @click="toggleForm(false)"
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
    import PageHeader from "@/components/PageHeader.vue";
    import LoginForm from "../components/LoginForm.vue";
    import SignupForm from "../components/SignupForm.vue";

    export default {
        name: "AccessPage",
        components: {
            PageHeader,
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

    @media (min-width: 500px) {
        .pageContent {
            width: 90vw;
        }
    }

    @media (min-width: 1000px) {
        .pageContent {
            max-width: 900px;
        }
    }

    @media (min-width: 1500px) {
        .pageContainer {
            max-width: 1000px;
        }
    }
</style>
