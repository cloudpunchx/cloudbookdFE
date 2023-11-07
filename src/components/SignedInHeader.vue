<template>
    <div>
        <v-app-bar color="background" flat class="custom-app-bar">
            <v-container>
                <v-row justify-content="center" align-content="center">
                    <v-col>
                        <!-- Logo -->
                        <!-- THIS LINK MIGHT NEED TO BE FIXED -->
                        <a href="/home">
                            <v-img
                                src="../assets/cloudbookdBlk.png"
                                class="mx-auto siteLogo"
                            >
                            </v-img>
                        </a>

                        <p class="text-center text-sm-body-2 text-md-body-1">
                            your solo reading journey
                        </p>
                    </v-col>
                </v-row>

                <!-- Only show Icon when it isMobile -->
                <v-app-bar-nav-icon
                    v-show="isMobile"
                    @click="toggleDrawer"
                    class="navIcon"
                ></v-app-bar-nav-icon>
            </v-container>
        </v-app-bar>

        <!-- NOT STARTED YET: -->
        <!-- Nav Drawer for Tablet/Mobile (smaller screens) -->
        <v-navigation-drawer
            color="grey"
            v-model="drawer"
            absolute
            temporary
            left
            :style="{position: drawer ? 'fixed' : 'absolute'}"
        >
            <v-list nav dense>
                <v-list-item-group>
                    <!-- <v-list-item>
                        <v-text-field
                            class="textField"
                            v-model="query"
                            hide-details
                            clearable
                            append-icon="mdi-magnify"
                        >
                        </v-text-field>
                    </v-list-item> -->

                    <v-list-item>
                        <p>test</p>
                    </v-list-item>

                    <v-list-item>
                        <p>test 2</p>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        name: "SignedInHeader",
        data() {
            return {
                drawer: false,
            };
        },
        computed: {
            isMobile() {
                const isMobile = this.$vuetify.breakpoint.smAndDown;
                console.log("isMobile:", isMobile);
                return isMobile;
            },
        },
        methods: {
            toggleDrawer() {
                this.drawer = !this.drawer;
            },
        },
    };
</script>

<style scoped>
    .custom-app-bar {
        padding: 70px;
    }

    .siteLogo {
        width: 200px;
    }

    @media (min-width: 1000px) {
        .siteLogo {
            width: 250px;
        }
    }
</style>
