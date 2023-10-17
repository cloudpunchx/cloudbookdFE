<template>
    <v-container class="text-center">
        <v-img src="../assets/cloudbookdLogo.png" width="250" class="mx-auto">
        </v-img>
        <LoginForm />
    </v-container>
</template>

<script>
    import LoginForm from "../components/LoginForm.vue";

    export default {
        name: "AccessPage",
        components: {
            LoginForm,
        },
    };
</script>

<style scoped></style>
