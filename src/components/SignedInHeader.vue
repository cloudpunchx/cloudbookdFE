<template>
    <div>
        <v-app-bar class="navContainer" color="background" flat>
            <v-row justify="center" align="center">
                <!-- Only show Hamburger Icon when isMobile -->
                <v-col cols="auto" v-if="isMobile">
                    <v-app-bar-nav-icon
                        class="navIcon"
                        @click="toggleDrawer"
                    ></v-app-bar-nav-icon>
                </v-col>

                <v-col cols="auto">
                    <!-- site Logo - routes to /home-->
                    <router-link to="/home">
                        <v-img
                            src="../assets/cloudbookdLogo1.png"
                            class="siteLogo"
                        >
                        </v-img>
                    </router-link>
                </v-col>

                <v-col cols="auto" v-show="!isMobile">
                    <!-- Another link to Home page - not shown when mobile -->
                    <v-btn class="btnText" text color="primary">
                        <router-link to="/home" class="navLink"
                            >Home</router-link
                        >
                    </v-btn>
                </v-col>

                <v-col cols="auto" v-show="!isMobile">
                    <!-- Link to My Books page - not shown when mobile-->
                    <v-btn
                        class="btnText"
                        text
                        color="primary"
                        @click="visitMyBooks"
                        >My Books</v-btn
                    >
                </v-col>

                <v-col cols="auto" v-show="!isMobile">
                    <!-- Book Search component - not shown when mobile -->
                    <BookSearch />
                </v-col>

                <v-col cols="auto" v-show="!isMobile">
                    <!-- Drop Down Menu - not shown when mobile -->
                    <v-menu offset-y>
                        <template v-slot:activator="{on, attrs}">
                            <v-btn
                                class="btnText"
                                color="primary"
                                text
                                v-bind="attrs"
                                v-on="on"
                                @mouseover="showDropdown = true"
                            >
                                <v-avatar size="30" class="avatar"
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
                        >
                            <v-list-item>
                                <v-list-item-title>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="visitEditProfile"
                                        >Edit Profile</v-btn
                                    >
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    <LogoutButton />
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </v-app-bar>

        <!-- Nav Drawer for Tablet/Mobile (smaller screens) -->
        <v-navigation-drawer
            color="background"
            v-model="drawer"
            absolute
            temporary
            left
            :style="{position: drawer ? 'fixed' : 'absolute'}"
        >
            <v-list nav>
                <v-list-item-group>
                    <v-list-item class="mobileListItem">
                        <BookSearch />
                    </v-list-item>
                    <v-list-item>
                        <LogoutButton />
                    </v-list-item>
                    <v-list-item>
                        <v-btn text color="primary" @click="visitEditProfile"
                            >Edit Profile</v-btn
                        >
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
    import router from "@/router";

    export default {
        name: "SignedInHeader",
        components: {
            LogoutButton,
            BookSearch,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                username: "",
                usernameUppercase: "",
                profileImg: "",
                drawer: false,
                showDropdown: false,
            };
        },
        computed: {
            isMobile() {
                const isMobile = this.$vuetify.breakpoint.smAndDown;
                // visual check if 'isMobile'
                console.log("isMobile:", isMobile);
                return isMobile;
            },
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            getUserProfile() {
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
            visitMyBooks() {
                if (this.$route.name !== "MyBooks") {
                    router.push({
                        name: "MyBooks",
                        params: {username: this.username},
                    });
                }
            },
            visitEditProfile() {
                if (this.$route.name !== "EditUserProfile") {
                    router.push({
                        name: "EditUserProfile",
                        params: {username: this.username},
                    });
                }
            },
            toggleDropdown() {
                this.showDropdown = !this.showDropdown;
            },
            toggleDrawer() {
                this.drawer = !this.drawer;
            },
        },
        created() {
            this.getUserProfile();
            this.getToken();
        },
    };
</script>

<style scoped>
    .navContainer {
        margin-top: 100px;
    }
    .siteLogo {
        width: 200px;
        cursor: pointer;
    }

    .navLink {
        text-decoration: none;
    }

    .avatar {
        margin: 10px;
    }

    .mobileListItem {
        margin-bottom: 15px;
    }

    @media (min-width: 960px) {
        .navContainer {
            margin-top: 0px;
        }

        .btnText {
            font-size: 16pt;
        }
    }
</style>
