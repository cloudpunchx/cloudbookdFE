<template>
    <div>
        <SignedInHeader />

        <v-container class="pageContent">
            <p class="headerText">Search</p>

            <!-- leaving off here with sizing and layout -->
            <v-card>
                <v-row no-gutters align="center">
                    <v-col cols="12">
                        <v-text-field
                            class="textField ma-4"
                            v-model="query"
                            hide-details
                            clearable
                            prepend-inner-icon="mdi-magnify"
                            background-color="transparent"
                            color="primary"
                            outlined
                        >
                        </v-text-field>
                    </v-col>
                    <v-col class="mx-2">
                        <v-btn color="primary" class="searchBtn">Search</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";

    export default {
        name: "BookSearchResultsPage",
        components: {
            SignedInHeader,
        },
        data() {
            return {
                query: "",
            };
        },
        created() {
            document.title = `Search results for ${this.query} | CloudBookd`;
        },
    };
</script>

<style scoped>
    .pageContent {
        margin-top: 100px;
    }

    .headerText {
        font-family: open-sans-regular;
        font-size: 14pt;
    }

    /* .textField {
        width: 250px;
    } */

    .searchBtn {
        font-size: 8pt;
        margin: 10px;
    }

    @media (min-width: 500px) {
        .pageContent {
            width: 90vw;
        }

        /* .textField {
            width: 300px;
        } */
    }

    @media (min-width: 960px) {
        .pageContainer {
            max-width: 1000px;
        }
        .pageContent {
            margin-top: 30px;
        }
        /* .textField {
            width: 370px;
        } */
    }

    @media (min-width: 1000px) {
        .pageContent {
            max-width: 900px;
        }

        .headerText {
            font-size: 18pt;
        }
    }

    @media (min-width: 1500px) {
        .pageContainer {
            max-width: 1000px;
        }
    }
</style>
