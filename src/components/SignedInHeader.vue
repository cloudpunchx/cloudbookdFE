<template>
    <div>
        <v-app-bar color="background" flat class="custom-app-bar">
            <v-container>
                <v-row justify="center" align="end">
                    <v-toolbar-title>
                        <!-- Logo -->
                        <router-link to="/home">
                            <v-img
                                src="../assets/cloudbookdBlk.png"
                                class="siteLogo"
                            >
                            </v-img>
                        </router-link>
                    </v-toolbar-title>

                    <!-- This will link to List page -->
                    <v-btn text color="primary">Lists</v-btn>

                    <BookSearch />

                    <v-menu v-show="!isMobile" offset-y>
                        <template v-slot:activator="{on, attrs}">
                            <v-btn
                                text
                                v-show="!isMobile"
                                v-bind="attrs"
                                v-on="on"
                                @mouseover="showDropdown = true"
                                class="listItemBtn"
                            >
                                <v-avatar
                                    v-show="!isMobile"
                                    size="30"
                                    class="avatar"
                                    ><v-img :src="profileImg"></v-img
                                ></v-avatar>
                                {{ usernameUppercase }}
                                <v-icon>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list
                            v-show="showDropdown"
                            @mouseover="showDropdown = true"
                            @mouseout="showDropdown = false"
                            class="listItem"
                        >
                            <v-list-item>
                                <v-list-item-title class="listItem">
                                    <LogoutButton />
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
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
            color="background"
            v-model="drawer"
            absolute
            temporary
            left
            :style="{position: drawer ? 'fixed' : 'absolute'}"
        >
            <v-list nav dense>
                <v-list-item-group>
                    <v-list-item>
                        <BookSearch />
                    </v-list-item>

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
    import LogoutButton from "./LogoutButton.vue";
    import BookSearch from "./BookSearch.vue";

    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "SignedInHeader",
        components: {
            LogoutButton,
            BookSearch,
        },
        data() {
            return {
                drawer: false,
                showDropdown: false,
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
            get_user_profile() {
                axios
                    .request({
                        url: this.apiUrl + "/user",
                        method: "GET",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                    })
                    .then((response) => {
                        this.username = response.data.username;
                        this.usernameUppercase = this.username.toUpperCase();
                        this.profileImg = response.data.profileImg;
                    })
                    .catch((error) => {
                        this.errorMsg = error;
                    });
            },
            toggleDropdown() {
                this.showDropdown = !this.showDropdown;
            },
            toggleDrawer() {
                this.drawer = !this.drawer;
            },
        },
        created() {
            this.get_user_profile();
        },
    };
</script>

<style scoped>
    .custom-app-bar {
        padding: 65px;
    }

    .siteLogo {
        width: 200px;
        margin-right: 15px;
        cursor: pointer;
    }

    .avatar {
        margin: 10px;
    }

    .listItemBtn {
        margin-right: 5px;
    }
    .listItem:hover {
        color: whitesmoke;
        cursor: pointer;
    }
    .mobileListItem:hover {
        color: whitesmoke;
    }

    /* @media (min-width: 1000px) {

    } */
</style>
