<template>
    <div
        ref="starsContainer"
        :class="{'stars-container': true, 'full-size': fullSize}"
    ></div>
</template>

<script>
    import * as THREE from "three";

    export default {
        name: "StarsBackground",
        props: {
            fullSize: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                camera: null,
                scene: null,
                renderer: null,
                meteors: [],
                starCount: 1000,
            };
        },
        mounted() {
            this.initThreeJS();
            if (this.fullSize) {
                window.addEventListener("resize", this.handleResize);
            }
            // Ensure animate is properly bound to Vue instance
            this.animate = this.animate.bind(this);
            this.animate(); // Start animation loop
        },
        beforeDestroy() {
            if (this.fullSize) {
                window.removeEventListener("resize", this.handleResize);
            }
        },
        methods: {
            initThreeJS() {
                const container = this.$refs.starsContainer;
                this.scene = new THREE.Scene();

                const width = this.fullSize
                    ? window.innerWidth
                    : container.offsetWidth;
                const height = this.fullSize
                    ? window.innerHeight
                    : container.offsetHeight;

                this.camera = new THREE.PerspectiveCamera(
                    75,
                    width / height,
                    0.1,
                    1000
                );
                this.camera.position.z = 30;

                this.renderer = new THREE.WebGLRenderer({alpha: true});
                this.renderer.setSize(width, height);
                container.appendChild(this.renderer.domElement);

                this.createStars(this.starCount);
                this.addMeteor();
            },
            createStars(count) {
                for (let i = 0; i < count; i++) {
                    const geometry = new THREE.SphereGeometry(0.05, 24, 24); // Adjust size for smaller stars
                    const material = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        transparent: true,
                    });
                    const star = new THREE.Mesh(geometry, material);
                    const [x, y, z] = Array(3)
                        .fill()
                        .map(() => THREE.MathUtils.randFloatSpread(200));
                    star.position.set(x, y, z);
                    star.userData = {
                        isStar: true,
                        offset: Math.random() * 2 * Math.PI,
                    };
                    this.scene.add(star);
                }
            },
            createMeteor() {
                if (this.meteors.length < 1) {
                    const geometry = new THREE.SphereGeometry(0.1, 20, 20);
                    const material = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                    });
                    const meteor = new THREE.Mesh(geometry, material);

                    meteor.position.set(
                        THREE.MathUtils.randFloatSpread(200),
                        THREE.MathUtils.randFloatSpread(200),
                        THREE.MathUtils.randFloatSpread(200)
                    );
                    meteor.userData.velocity = new THREE.Vector3(
                        (Math.random() - 0.5) * 2,
                        -Math.random() * 3 - 1,
                        0
                    );

                    this.scene.add(meteor);
                    this.meteors.push(meteor);

                    setTimeout(() => {
                        this.scene.remove(meteor);
                        this.meteors.splice(this.meteors.indexOf(meteor), 1);
                    }, 10000); // Remove meteor after it moves out of view
                }
            },
            addMeteor() {
                setInterval(() => {
                    this.createMeteor();
                }, Math.random() * 2000 + 1000); // Create a new meteor at random intervals
            },
            animate() {
                requestAnimationFrame(this.animate);

                // Twinkle stars
                this.scene.children.forEach((object) => {
                    if (object.userData.isStar) {
                        object.material.opacity =
                            0.5 +
                            Math.sin(
                                Date.now() * 0.001 + object.userData.offset
                            ) *
                                0.5;
                    }
                });

                // Animate and potentially remove meteors
                this.meteors.forEach((meteor, index) => {
                    meteor.position.add(meteor.userData.velocity);

                    if (
                        meteor.position.y < -50 ||
                        Math.abs(meteor.position.x) > 150 ||
                        Math.abs(meteor.position.z) > 150
                    ) {
                        this.scene.remove(meteor);
                        this.meteors.splice(index, 1);
                    }
                });

                this.renderer.render(this.scene, this.camera);
            },
            handleResize() {
                const width = this.fullSize
                    ? window.innerWidth
                    : this.$refs.starsContainer.offsetWidth;
                const height = this.fullSize
                    ? window.innerHeight
                    : this.$refs.starsContainer.offsetHeight;

                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(width, height);
            },
        },
    };
</script>

<style scoped>
    .stars-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .full-size {
        width: 100vw;
        height: 100vh;
        position: fixed;
    }
</style>
