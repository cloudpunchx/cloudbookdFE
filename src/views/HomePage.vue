<template>
    <div>
        <SignedInHeader />

        <div class="pageContentContainer">
            <div class="pageContentRow1">
                <v-row>
                    <v-col cols="12" sm="4" md="4" lg="4">
                        <!-- Currently Reading Container -->
                        <CurrentlyReading />
                    </v-col>

                    <v-col cols="12" sm="4" md="4" lg="4">
                        <div class="arch-container">
                            <v-img
                                src="../assets/ghostieReading.png"
                                class="arch-image"
                            ></v-img>
                            <ReadingChallenge />
                        </div>
                    </v-col>

                    <v-col cols="12" sm="4" md="4" lg="4">
                        <!-- Recently Read Container -->
                        <RecentlyRead />
                    </v-col>
                </v-row>
            </div>

            <div class="pageContentRow2">
                <v-row justify="center">
                    <v-col sm="12" md="12" lg="12">
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

    export default {
        name: "HomePage",
        components: {
            SignedInHeader,
            CurrentlyReading,
            RecentlyRead,
            ReadingChallenge,
            ToBeReadPreview,
        },
    };
</script>

<style scoped>
    .pageContentRow1 {
        margin-top: 25px;
        padding: 50px;
    }
    .pageContentRow2 {
        padding: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .arch-image {
        width: 375px;
        height: auto;
    }

    .arch-container,
    .arch-image {
        border-top-left-radius: 50% 30%;
        border-top-right-radius: 50% 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media (min-width: 600px) {
        /* Medium Sizing */
        .pageContentRow1 {
            margin-top: 50px;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        .pageContentRow2 {
            padding: 0;
        }
        .arch-image {
            width: 400px;
            height: auto;
        }

        .arch-container,
        .arch-image {
            border-top-left-radius: 50% 30%;
            border-top-right-radius: 50% 30%;
        }
    }

    @media (min-width: 1000px) {
        /* Desktop Sizing and Larger */
        .pageContentContainer {
            max-width: 1100px;
            margin-left: auto;
            margin-right: auto;
        }
        .arch-image {
            width: 450px;
            height: auto; /* Maintain aspect ratio */
        }
        .arch-container {
            max-width: 450px;
        }
    }
</style>
