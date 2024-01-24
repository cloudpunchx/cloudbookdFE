<template>
    <div>
        <SignedInHeader />

        <v-container class="pageContent">
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <!-- Currently Reading Container -->
                    <CurrentlyReading />

                    <!-- Recently Read Container -->
                    <RecentlyRead />
                </v-col>

                <v-col cols="12" sm="6" md="6">
                    <!-- Reading Challenge -->
                    <ReadingChallenge class="readingChallengeContainer" />

                    <!-- To Be Read Container -->
                    <ToBeReadPreview />
                </v-col>
            </v-row>
        </v-container>
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
    .pageContent {
        margin-top: 50px;
    }
    .readingChallengeContainer {
        margin-bottom: 10px;
    }

    @media (min-width: 500px) {
        .pageContent {
            width: 85vw;
        }
    }

    @media (min-width: 600px) {
        .pageContent {
            width: 100vw;
        }
    }

    @media (min-width: 800px) {
        .pageContent {
            width: 90vw;
        }
    }

    @media (min-width: 1000px) {
        .pageContent {
            max-width: 45vw;
            margin-top: 25px;
        }
    }
</style>
