import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/LandingPage";
import HomePage from "../views/HomePage";
import EditUserProfile from "../views/EditUserProfile";
import BookSearchResultsPage from "../views/BookSearchResultsPage";
import BookPage from "../views/BookPage";
import MyBooks from "../views/MyBooks";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "LandingPage",
        component: LandingPage,
        meta: [
            {
                title: "CloudBookd | Your Solo Reading Journey",
            },
            {
                name: "description",
                content: "CloudBookd, track all your books!",
            },
            {
                name: "keywords",
                content:
                    "cloudbookd, books, read, rate, track, tracker, series",
            },
            {
                name: "author",
                content: "Siobhan Bonardi",
            },
        ],
    },
    {
        path: "/home",
        name: "HomePage",
        component: HomePage,
        meta: [
            {
                title: "CloudBookd | Your Solo Reading Journey",
            },
            {
                name: "description",
                content: "CloudBookd, track all your books!",
            },
            {
                name: "keywords",
                content:
                    "cloudbookd, books, read, rate, track, tracker, series",
            },
            {
                name: "author",
                content: "Siobhan Bonardi",
            },
        ],
    },
    {
        path: "/user/edit",
        name: "EditUserProfile",
        component: EditUserProfile,
        meta: [
            {
                title: "Edit Profile | Cloudbookd",
            },
            {
                name: "description",
                content: "CloudBookd, track all your books!",
            },
            {
                name: "keywords",
                content:
                    "cloudbookd, books, read, rate, track, tracker, series",
            },
            {
                name: "author",
                content: "Siobhan Bonardi",
            },
        ],
    },
    {
        path: "/search",
        name: "BookSearchResultsPage",
        component: BookSearchResultsPage,
        meta: [
            // title is set in creation of BookSearchResultsPage using custom query
            {
                name: "description",
                content: "CloudBookd, track all your books!",
            },
            {
                name: "keywords",
                content:
                    "cloudbookd, books, read, rate, track, tracker, series",
            },
            {
                name: "author",
                content: "Siobhan Bonardi",
            },
        ],
    },
    {
        path: "/book/:bookId",
        name: "BookPage",
        component: BookPage,
        meta: [
            // title is set in creation of BookSearchResultsPage using custom query
            {
                name: "description",
                content: "CloudBookd, track all your books!",
            },
            {
                name: "keywords",
                content:
                    "cloudbookd, books, read, rate, track, tracker, series",
            },
            {
                name: "author",
                content: "Siobhan Bonardi",
            },
        ],
    },
    {
        path: "/mybooks",
        name: "MyBooks",
        component: MyBooks,
        meta: [
            // title is set in creation of BookSearchResultsPage using custom query
            {
                name: "description",
                content: "CloudBookd, track all your books!",
            },
            {
                name: "keywords",
                content:
                    "cloudbookd, books, read, rate, track, tracker, series",
            },
            {
                name: "author",
                content: "Siobhan Bonardi",
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    // Get all meta tags
    let metaTags = document.querySelectorAll("meta");
    // Loop through the tags and remove each
    // for OF is vanilla Javascript so that's what we have to use (vue is for in loops) and this page is PURE JAVASCRIPT
    for (let tag of metaTags) {
        tag.remove();
    }
    // to.meta (navigating TO.meta.title)
    let newTags = to.meta;
    document.querySelector("title").innerText = newTags[0].title;

    // i zero is the title obj that we don't need here
    for (let i = 1; i < newTags.length; i++) {
        document
            .querySelector(`head`)
            .insertAdjacentHTML(
                `afterbegin`,
                `<meta name:"${newTags[i].name}" description="${newTags[i].content}">`
            );
    }
    document.querySelector(`head`).insertAdjacentHTML(
        `afterbegin`,
        `<meta charset="utf-8">
                                                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                                    <meta name="viewport" content="width=device-width,initial-scale=1.0">`
    );
    next();
    from;
});

export default router;
