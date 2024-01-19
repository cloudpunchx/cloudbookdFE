<template>
    <div>
        <SignedInHeader />

        <v-container class="pageContent">
            <v-row justify="center">
                <v-card
                    color="lavender"
                    elevation="10"
                    class="editProfileContainer"
                >
                    <!-- Page Header -->
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
                                    :counter="10"
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
                                    :counter="10"
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
                                    label="Profile Img"
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
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";

    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "EditUserProfile",
        components: {
            SignedInHeader,
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
                responseMsg: "",
                errorMsg: "",
            };
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
    .pageContent {
        margin-top: 80px;
    }
    .header {
        color: white;
        font-family: lemon;
        font-size: 17pt;
        font-weight: bold;
    }
    .editProfileContainer {
        padding: 50px;
        margin: 50px;
    }

    .errorMsg,
    .responseMsg {
        font-size: 10pt;
        margin-top: 20px;
    }
    .errorMsg {
        color: red;
    }
    @media (min-width: 600px) {
    }
    @media (min-width: 1000px) {
        .pageContent {
            margin-top: 0;
        }
        .header {
            font-size: 22pt;
            margin: 15px;
        }
    }
    @media (min-width: 1500px) {
    }
</style>
