<template>
    <div>
        <SignedInHeader
            @username="handleUsername"
            class="signedInHeaderClass"
        />
        <StarsBackground :fullSize="true" />

        <div class="pageContentContainer">
            <div>
                <v-row>
                    <v-col
                        cols="12"
                        lg="12"
                        class="d-flex flex-column justify-center align-center"
                    >
                        <!-- Welcome Message and Banner -->
                        <v-img
                            src="../assets/bookBanner.png"
                            alt="Books in a row, with a moon and clouds in center"
                            class="bookBanner"
                        ></v-img>
                        <h1 class="welcomeMsg">Welcome {{ username }}!</h1>
                    </v-col>
                </v-row>
            </div>

            <div>
                <v-row justify="center">
                    <v-col cols="10" lg="3">
                        <!-- Currently Reading Container -->
                        <CurrentlyReading />
                    </v-col>

                    <v-col cols="10" lg="3">
                        <!-- Reading Challenge Container -->
                        <ReadingChallenge />
                        <div class="centerImgContainer">
                            <v-img
                                src="../assets/bookStackSkull.png"
                                alt="Stacked books, blue and purple, skull on top."
                            ></v-img>
                        </div>
                    </v-col>

                    <v-col cols="10" lg="3">
                        <!-- Recently Read Container -->
                        <RecentlyRead />
                    </v-col>
                </v-row>
            </div>

            <div class="tbrContainer">
                <v-row justify="center">
                    <v-col cols="10" lg="9">
                        <!-- To Be Read Container -->
                        <ToBeReadPreview />
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import CurrentlyReading from "@/components/CurrentlyReading.vue";
    import RecentlyRead from "@/components/RecentlyRead.vue";
    import ReadingChallenge from "@/components/ReadingChallenge.vue";
    import ToBeReadPreview from "@/components/ToBeReadPreview.vue";
    import StarsBackground from "@/components/StarsBackground.vue";

    export default {
        name: "HomePage",
        components: {
            SignedInHeader,
            CurrentlyReading,
            RecentlyRead,
            ReadingChallenge,
            ToBeReadPreview,
            StarsBackground,
        },
        data() {
            return {
                username: "",
            };
        },
        methods: {
            // set username with var from SignedInHeader
            handleUsername(username) {
                this.username = username;
            },
        },
    };
</script>

<style scoped>
    .signedInHeaderClass {
        position: relative;
        z-index: 2;
    }
    .pageContentContainer {
        margin-top: 25px;
    }
    .bookBanner {
        width: 100%;
        max-width: 300px;
    }
    .welcomeMsg {
        color: white;
        font-size: 19pt;
    }
    .centerImgContainer {
        margin: 25px auto 0;
        max-width: 300px;
    }
    .tbrContainer {
        margin-top: 25px;
    }

    @media (min-width: 1000px) {
        /* Desktop Sizing and Larger */

        .bookBanner {
            min-width: 1000px;
            max-width: 1100px;
        }

        .welcomeMsg {
            font-size: 25pt;
        }

        .pageContentContainer {
            max-width: 1500px;
            margin: 0 auto;
        }
    }
</style>
