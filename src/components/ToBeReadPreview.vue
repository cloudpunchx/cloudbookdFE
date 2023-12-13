<template>
    <div>
        <!-- API Call to GET to be read, make clickable -->
        <v-container class="container">
            <p class="header">Want to Read</p>
            <v-row>
                <v-col
                    v-for="n in 9"
                    :key="n"
                    class="d-flex child-flex"
                    cols="4"
                >
                    <v-img
                        :src="`https://picsum.photos/500/300?image=${
                            n * 5 + 10
                        }`"
                        :lazy-src="`https://picsum.photos/10/6?image=${
                            n * 5 + 10
                        }`"
                        aspect-ratio="1"
                        class="grey lighten-2"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "ToBeReadPreview",
    };
</script>

<style scoped>
    /* NOT STYLED YET */
    .header {
        font-family: open-sans-regular;
        font-size: 18pt;
    }

    .container {
        background-color: #f7edf0;
    }
</style>
