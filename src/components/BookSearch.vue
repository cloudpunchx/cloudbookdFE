<template>
    <div>
        <v-text-field
            class="textField"
            v-model="query"
            hide-details
            clearable
            placeholder="Search Books"
            append-icon="mdi-magnify"
            @click:append="searchBooks"
            background-color="transparent"
            color="primary"
        >
        </v-text-field>
    </div>
</template>

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
            searchBooks() {
                router.push({
                    name: "BookSearchResultsPage",
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
