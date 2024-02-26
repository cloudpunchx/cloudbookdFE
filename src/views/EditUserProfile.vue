<template>
    <div>
        <SignedInHeader class="signedInHeaderClass" />
        <StarsBackground :fullSize="true" />

        <v-container class="pageContent">
            <v-row>
                <v-col sm="12" md="5" lg="4">
                    <v-card
                        color="primary"
                        elevation="10"
                        class="profileContainer"
                    >
                        <v-row>
                            <v-col>
                                <div class="avatar-container">
                                    <img
                                        src="../assets/bookBorder.png"
                                        alt="Border"
                                        class="avatar-border"
                                    />
                                    <v-avatar size="100" class="avatar">
                                        <v-img :src="profileImgGet"></v-img>
                                    </v-avatar>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <h1 class="username">{{ usernameGet }}</h1>
                                <h5>~ member since {{ memberSinceYear }} ~</h5>
                                <h4 v-if="bioGet">{{ bioGet }}</h4>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="12" md="7" lg="8">
                    <v-card
                        color="primary"
                        elevation="10"
                        class="editProfileContainer"
                    >
                        <h1 class="header">Edit Profile</h1>
                        <v-form ref="form" class="text-center">
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="username"
                                        label="Username"
                                        :placeholder="usernameGet"
                                        color="primary"
                                        outlined
                                        dark
                                        dense
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="firstName"
                                        :rules="nameRules"
                                        label="First Name"
                                        :placeholder="firstNameGet"
                                        color="primary"
                                        outlined
                                        dark
                                        dense
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="lastName"
                                        :rules="nameRules"
                                        label="Last Name"
                                        :placeholder="lastNameGet"
                                        color="primary"
                                        outlined
                                        dark
                                        dense
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        label="E-mail"
                                        :placeholder="emailGet"
                                        color="primary"
                                        outlined
                                        dark
                                        dense
                                    ></v-text-field>

                                    <!-- Password Text Field -->
                                    <v-text-field
                                        v-model="password"
                                        :append-icon="
                                            show1 ? 'mdi-eye' : 'mdi-eye-off'
                                        "
                                        :rules="[rules.min]"
                                        :type="show1 ? 'text' : 'password'"
                                        name="input-10-1"
                                        label="Password"
                                        hint="At least 8 characters"
                                        counter
                                        color="primary"
                                        outlined
                                        dark
                                        dense
                                        @click:append="show1 = !show1"
                                    ></v-text-field>

                                    <v-textarea
                                        v-model="bio"
                                        label="Bio"
                                        :placeholder="bioGet"
                                        color="primary"
                                        outlined
                                        dark
                                        dense
                                    ></v-textarea>

                                    <v-text-field
                                        v-model="profileImg"
                                        label="Profile Img (URL only)"
                                        :placeholder="profileImgGet"
                                        color="primary"
                                        outlined
                                        dark
                                        dense
                                    ></v-text-field>

                                    <!-- Submit Button -->
                                    <v-btn
                                        text
                                        dark
                                        class="submitBtn"
                                        @click="edit_user_profile"
                                        >Submit Changes</v-btn
                                    >

                                    <div v-if="responseMsg">
                                        <p>{{ responseMsg }}</p>
                                    </div>

                                    <div v-if="errorMsg">
                                        <p class="errorMsg">{{ errorMsg }}</p>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import StarsBackground from "@/components/StarsBackground.vue";

    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "EditUserProfile",
        components: {
            SignedInHeader,
            StarsBackground,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                username: "",
                usernameGet: "",
                firstName: "",
                firstNameGet: "",
                lastName: "",
                lastNameGet: "",
                nameRules: [
                    (v) =>
                        v.length <= 10 ||
                        "Name must be less than 10 characters",
                ],
                email: "",
                emailGet: "",
                emailRules: [
                    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
                ],
                show1: false,
                password: "",
                rules: {
                    min: (v) => v.length >= 8 || "Min 8 characters",
                },
                bio: "",
                bioGet: "",
                profileImg: "",
                profileImgGet: "",
                memberSince: "",
                responseMsg: "",
                errorMsg: "",
            };
        },
        computed: {
            memberSinceYear() {
                return this.memberSince
                    ? new Date(this.memberSince).getFullYear()
                    : "";
            },
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
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
                        this.usernameGet = response.data.username;
                        this.firstNameGet = response.data.firstName;
                        this.lastNameGet = response.data.lastName;
                        this.emailGet = response.data.email;
                        this.bioGet = response.data.bio;
                        this.profileImgGet = response.data.profileImg;
                        this.memberSince = response.data.createdAt;
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        // Set a timeout to clear the error after 1 minute
                        setTimeout(() => {
                            this.clearResponse();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    });
            },
            edit_user_profile() {
                axios
                    .request({
                        url: this.apiUrl + "/user",
                        method: "PATCH",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                        data: {
                            username: this.username,
                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email,
                            password: this.password,
                            bio: this.bio,
                            profileImg: this.profileImg,
                        },
                    })
                    .then((response) => {
                        this.responseMsg = response.data;
                        // Set a timeout to clear the response after 1 minute
                        setTimeout(() => {
                            this.clearResponse();
                        }, 60000); // 1 minute = 60,000 milliseconds
                        // clear fields
                        this.clearEditForm();
                        // reload profile
                        this.get_user_profile();
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        // Set a timeout to clear the error after 1 minute
                        setTimeout(() => {
                            this.clearResponse();
                        }, 60000); // 1 minute = 60,000 milliseconds
                    });
            },
            clearEditForm() {
                this.username = "";
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.username = "";
                this.password = "";
                this.bio = "";
                this.profileImg = "";
            },
            clearResponse() {
                this.responseMsg = "";
                this.errorMsg = "";
            },
        },
        created() {
            document.title = `${this.$route.params.username}'s Profile`; //set page Title based on signed in user
            this.getToken();
            this.get_user_profile();
        },
    };
</script>

<style scoped>
    .signedInHeaderClass {
        position: relative;
        z-index: 2;
    }
    .pageContent {
        margin-top: 80px;
    }
    .avatar-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .avatar-border {
        z-index: 1;
        position: absolute;
        /* Adjust width and height to fit the avatar size plus desired border thickness */
        width: 130px;
        height: 130px;
        /* Center the image */
        top: 55%;
        left: 51%;
        transform: translate(-50%, -50%);
    }

    .avatar {
        position: relative;
    }

    .username {
        color: white;
        font-family: lemon;
        font-size: 12pt;
    }
    .header {
        color: white;
        font-family: lemon;
        font-size: 17pt;
        font-weight: bold;
    }

    .profileContainer,
    .editProfileContainer {
        color: white;
        text-align: center;
        padding: 25px;
        margin: 0 50px;
    }

    .errorMsg,
    .responseMsg {
        font-size: 10pt;
        margin-top: 20px;
    }
    .errorMsg {
        color: red;
    }
    @media (min-width: 960px) {
        .profileContainer,
        .editProfileContainer {
            margin: 0 10px;
        }
    }
    @media (min-width: 1000px) {
        .pageContent {
            margin-top: 0;
        }
        .username {
            font-size: 15pt;
        }
        .header {
            font-size: 22pt;
            margin: 15px;
        }
        .profileContainer,
        .editProfileContainer {
            margin: 50px 10px;
        }
    }
    @media (min-width: 1500px) {
        .pageContent {
            max-width: 65vw;
        }
    }
</style>
