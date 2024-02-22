<template>
    <v-footer color="background" elevation="24">
        <v-container>
            <v-row justify="center">
                <v-col class="text-center" lg="1">
                    <!-- Email Link -->
                    <a href="mailto:siobhanbonardi@gmail.com" target="_blank">
                        <v-icon color="white"> mdi-email </v-icon>
                    </a>
                </v-col>
                <v-col class="text-center" lg="1">
                    <!-- Cloudpunch Media Logo -->
                    <a href="https://cloudpunch.ca/#/" target="_blank">
                        <img
                            src="../assets/cloudpunchMediaDark.png"
                            alt="Cloudpunch Media Logo"
                            width="150"
                        />
                    </a>
                </v-col>
                <v-col class="text-center" lg="1">
                    <a
                        href="https://github.com/cloudpunchx/cloudbookdFE"
                        target="_blank"
                    >
                        <img
                            src="../assets/github-mark-white.png"
                            alt="Github Logo - white"
                            width="25"
                        />
                    </a>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script>
    export default {
        name: "PageFooter",
    };
</script>

<style scoped></style>
