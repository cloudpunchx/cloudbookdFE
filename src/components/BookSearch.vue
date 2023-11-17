<template>
    <div>
        <!-- not sure if I need the isMobile, it might just be enough that it knows on the signedinheader component -->
        <v-text-field
            class="textField"
            v-model="query"
            hide-details
            clearable
            placeholder="Search Books"
            append-icon="mdi-magnify"
            @click:append="search_books"
            background-color="transparent"
            color="primary"
        >
        </v-text-field>
    </div>
</template>

<!-- Will need to set up API call on the search results page -->

<script>
    import router from "@/router";
    import axios from "axios";

    export default {
        name: "BookSearch",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                apiUrl: process.env.VUE_APP_API_URL,
                query: "",
            };
        },
        methods: {
            search_books() {
                router.push({
                    name: "SearchResults",
                    params: {query: this.query},
                });
            },
            toggleDrawer() {
                this.drawer = !this.drawer;
            },
            // THIS IS HERE FOR AN EXAMPLE OF HEADERS - EG WHERE TO USE API KEY - RE-WRITE THIS FUNCTION
            getMenu() {
                axios
                    .request({
                        url: this.apiUrl + "menu",
                        method: "GET",
                        headers: {
                            "x-api-key": this.apiKey,
                        },
                        params: {
                            // using variable we took from the cookie and using it as a param
                            restaurantId: this.restaurantId,
                            menuId: this.menuId,
                        },
                    })
                    .then((response) => {
                        this.menu = response.data;
                    })
                    .catch((error) => {
                        error = "Something went wrong, please try again.";
                        alert(error);
                    });
            },
        },
    };
</script>

<style scoped></style>
