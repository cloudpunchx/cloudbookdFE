<template>
    <div>
        <SignedInHeader />

        <v-container class="pageContent">
            <v-row>
                <v-col>
                    <!-- Currently Reading Container -->
                    <CurrentlyReading />
                </v-col>

                <v-col>
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
        margin-top: 25px;
    }
    .readingChallengeContainer {
        margin-bottom: 10px;
    }

    @media (min-width: 500px) {
        .pageContent {
            width: 90vw;
        }
    }

    @media (min-width: 1000px) {
        .pageContent {
            max-width: 900px;
        }
    }

    @media (min-width: 1500px) {
        .pageContainer {
            max-width: 1000px;
        }
    }
</style>
