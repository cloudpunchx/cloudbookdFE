<template>
    <div>
        <!-- not sure if I need the isMobile, it might just be enough that it knows on the signedinheader component -->
        <v-text-field
            class="textField"
            v-model="query"
            hide-details
            clearable
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

    export default {
        name: "BookSearch",
        data() {
            return {
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
        },
    };
</script>

<style scoped></style>
