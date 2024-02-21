<template>
    <div>
        <v-container class="pageContent" fluid>
            <v-row>
                <!-- first col with logo and about -->
                <v-col cols="12" sm="12" md="5" lg="5" class="purpleContainer">
                    <div class="contentWrapper">
                        <v-card
                            elevation="0"
                            color="transparent"
                            class="purpleContent mx-auto"
                        >
                            <!-- site Logo -->
                            <router-link to="/">
                                <v-img
                                    src="../assets/cloudbookdLogo.png"
                                    alt="Cloudbookd Logo"
                                    class="siteLogo"
                                ></v-img>
                            </router-link>

                            <!-- brief about section -->
                            <ul class="aboutSection">
                                <li>Welcome to your solo reading journey.</li>
                                <li>
                                    Track your to be read, current reads and
                                    history.
                                </li>
                                <li>
                                    Set and track your annual reading goals.
                                </li>
                            </ul>
                            <v-img
                                src="../assets/ghostMoon.png"
                                alt="Ghost sitting on crescent moon, reading a book."
                                class="ghostMoonImg"
                            ></v-img>
                        </v-card>
                    </div>
                </v-col>

                <!-- 2nd col with login/signup card -->
                <v-col
                    cols="12"
                    sm="12"
                    md="7"
                    lg="7"
                    class="loginContainer d-flex justify-center align-center"
                >
                    <v-card
                        elevation="24"
                        color="background"
                        class="formsCard"
                        shaped
                    >
                        <!-- login / signup form toggle -->
                        <v-card-actions class="justify-end">
                            <v-btn
                                :class="{active: isActiveLogin}"
                                plain
                                dark
                                @click="toggleForm(true)"
                                >LOG IN</v-btn
                            >
                            <v-btn
                                :class="{active: isActiveSignUp}"
                                plain
                                dark
                                @click="toggleForm(false)"
                                >SIGN UP</v-btn
                            >
                        </v-card-actions>

                        <LoginForm v-if="login" />
                        <SignupForm v-if="!login" />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import LoginForm from "../components/LoginForm.vue";
    import SignupForm from "../components/SignupForm.vue";

    import * as THREE from "three";

    export default {
        name: "LandingPage",
        components: {
            LoginForm,
            SignupForm,
        },
        data() {
            return {
                login: true,
            };
        },
        mounted() {
            this.add3DStars();
            window.addEventListener("resize", this.onWindowResize);
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.onWindowResize);
        },
        methods: {
            toggleForm(isLogin) {
                this.login = isLogin;
            },
            add3DStars() {
                const container = this.$el.querySelector(".purpleContainer");

                // Ensure the container has a defined position to contain the canvas
                container.style.position = "relative";

                // Scene
                let scene = new THREE.Scene();

                // Camera
                this.camera = new THREE.PerspectiveCamera(
                    75,
                    container.offsetWidth / container.offsetHeight,
                    0.1,
                    1000
                );
                this.camera.position.z = 30;

                // Renderer
                this.renderer = new THREE.WebGLRenderer({alpha: true});
                this.renderer.setSize(
                    container.offsetWidth,
                    container.offsetHeight
                );

                // Explicitly set z-index of the canvas to ensure it's behind the content
                this.renderer.domElement.style.zIndex = 0;
                this.renderer.domElement.style.position = "absolute";
                this.renderer.domElement.style.top = "0";

                container.appendChild(this.renderer.domElement);

                // Stars
                let stars = []; // Array to hold star meshes
                let starGeometry = new THREE.SphereGeometry(0.1, 24, 24);
                for (let i = 0; i < 200; i++) {
                    let starMaterial = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        transparent: true, // Enable transparency
                        opacity: 1, // Start fully opaque
                    });
                    let star = new THREE.Mesh(starGeometry, starMaterial);
                    let x = THREE.MathUtils.randFloatSpread(100);
                    let y = THREE.MathUtils.randFloatSpread(100);
                    let z = THREE.MathUtils.randFloatSpread(100);
                    star.position.set(x, y, z);
                    scene.add(star);
                    stars.push(star); // Add the star to the array
                }

                // Animation loop for twinkling effect
                const animate = () => {
                    requestAnimationFrame(animate);

                    // Slower twinkle effect
                    stars.forEach((star) => {
                        // Significantly reduce the rate of opacity change
                        let change = 0.02 * Math.random();
                        if (Math.random() < 0.5) {
                            star.material.opacity = Math.max(
                                0,
                                star.material.opacity - change
                            );
                        } else {
                            star.material.opacity = Math.min(
                                1,
                                star.material.opacity + change
                            );
                        }
                    });

                    this.renderer.render(scene, this.camera);
                };

                animate();
            },
            onWindowResize() {
                const container = this.$el.querySelector(".purpleContainer");
                const width = container.offsetWidth;
                const height = container.offsetHeight;
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(width, height);
            },
        },
    };
</script>

<style scoped>
    .purpleContainer {
        background-color: #13022c;
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .contentWrapper {
        position: relative;
        z-index: 2;
    }

    .siteLogo,
    .aboutSection,
    .ghostMoonImg {
        position: relative;
        z-index: 1;
    }

    .siteLogo {
        max-width: 200px;
        margin-top: 20px;
    }

    .purpleContent {
        padding: 20px;
    }

    .aboutSection {
        color: #c0c0c0;
        font-size: 11pt;
        font-weight: bold;
        padding: 0;
        margin-top: 20px;
        list-style-type: none;
    }

    .ghostMoonImg {
        max-width: 200px;
        margin-top: 25px;
    }
    .loginContainer {
        background-color: #d0cadb;
    }
    .formsCard {
        width: 50vw;
        min-width: 300px;
        max-width: 550px;
        margin: 25px 0 200px;
    }

    @media (min-width: 960px) {
        .purpleContainer {
            min-height: 100vh;
        }
        .formsCard {
            margin: 0 0 0;
        }
    }

    @media (min-width: 1000px) {
        .siteLogo {
            max-width: 300px;
            margin-top: 0;
        }
        .aboutSection {
            font-size: 15pt;
        }
        .ghostMoonImg {
            max-width: 300px;
        }
    }

    @media (min-width: 2000px) {
        .siteLogo {
            max-width: 350px;
            margin-top: 0;
        }
        .aboutSection {
            font-size: 18pt;
        }
        .ghostMoonImg {
            max-width: 500px;
        }
    }
</style>
