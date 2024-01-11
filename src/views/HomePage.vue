<template>
    <div>
        <SignedInHeader />

        <v-container class="pageContent">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <!-- Currently Reading Container -->
                    <CurrentlyReading />
                </v-col>

                <v-col cols="12" sm="12" md="6">
                    <!-- Reading Challenge -->
                    <ReadingChallenge class="readingChallengeContainer" />

                    <!-- To Be Read Container -->
                    <ToBeReadPreview />
                </v-col>
            </v-row>

            <!-- IDEA: Below the current content have a grid for each created bookshelf, that displays the list name and a selected book cover img that is a link to list page -->
        </v-container>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import CurrentlyReading from "@/components/CurrentlyReading.vue";
    import ReadingChallenge from "@/components/ReadingChallenge.vue";
    import ToBeReadPreview from "@/components/ToBeReadPreview.vue";

    export default {
        name: "HomePage",
        components: {
            SignedInHeader,
            CurrentlyReading,
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

    @media (min-width: 1000px) {
        .pageContent {
            max-width: 900px;
            margin-top: 25px;
        }
    }

    @media (min-width: 1500px) {
        .pageContainer {
            max-width: 1500px;
        }
    }
</style>
