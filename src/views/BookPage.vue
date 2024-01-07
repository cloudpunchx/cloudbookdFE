<template>
    <div></div>
</template>

<script>
    export default {
        name: "BookPage",
        data() {
            return {
                bookId: "",
            };
        },
        methods: {
            name() {},
        },
        created() {
            document.title = `${this.$route.params.bookName} | CloudBookd`;
            this.bookId = this.$route.params.bookId; // Assign the bookID to selected book from data
        },
    };
</script>

<style scoped></style>
