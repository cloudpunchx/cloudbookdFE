<template>
    <div ref="starsContainer" class="stars-container"></div>
</template>

<script>
    import * as THREE from "three";

    export default {
        name: "StarsComponent",
        data() {
            return {
                meteors: [],
            };
        },
        mounted() {
            this.initThreeJS();
        },
        methods: {
            initThreeJS() {
                const container = this.$refs.starsContainer;
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(
                    75,
                    window.innerWidth / window.innerHeight,
                    0.1,
                    1000
                );
                camera.position.z = 30;

                const renderer = new THREE.WebGLRenderer({alpha: true});
                renderer.setSize(window.innerWidth, window.innerHeight);
                container.appendChild(renderer.domElement);

                const stars = this.createStars(scene, 1000);

                // Initially create a meteor
                this.addMeteor(scene);

                // Animation loop
                const animate = () => {
                    requestAnimationFrame(animate);

                    // Twinkle stars
                    stars.forEach((star) => {
                        star.material.opacity =
                            0.5 +
                            Math.sin(
                                Date.now() * 0.001 + star.userData.offset
                            ) *
                                0.5;
                    });

                    // Animate and potentially remove meteors
                    this.meteors.forEach((meteor, index) => {
                        meteor.position.add(meteor.userData.velocity);

                        // Remove the meteor if it goes out of view
                        if (
                            meteor.position.y < -50 ||
                            Math.abs(meteor.position.x) > 150 ||
                            Math.abs(meteor.position.z) > 150
                        ) {
                            scene.remove(meteor);
                            this.meteors.splice(index, 1);
                        }
                    });

                    renderer.render(scene, camera);
                };

                animate();

                // Handle window resize
                window.addEventListener("resize", () => {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                });
            },

            createStars(scene, count) {
                const stars = [];
                for (let i = 0; i < count; i++) {
                    const geometry = new THREE.SphereGeometry(0.08, 24, 24);
                    const material = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        transparent: true,
                    });
                    const star = new THREE.Mesh(geometry, material);
                    const [x, y, z] = Array(3)
                        .fill()
                        .map(() => THREE.MathUtils.randFloatSpread(200));
                    star.position.set(x, y, z);
                    star.userData.offset = Math.random() * 2 * Math.PI; // Random phase offset for twinkling
                    scene.add(star);
                    stars.push(star);
                }
                return stars;
            },

            createMeteor(scene) {
                // Only create a new meteor if there isn't already one
                if (this.meteors.length < 1) {
                    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
                    const material = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                    });
                    const meteor = new THREE.Mesh(geometry, material);

                    meteor.position.set(
                        THREE.MathUtils.randFloatSpread(200), // Random x position
                        THREE.MathUtils.randFloatSpread(200), // Random y position to start from different heights
                        THREE.MathUtils.randFloatSpread(200) // Random z position
                    );

                    meteor.userData.velocity = new THREE.Vector3(
                        (Math.random() - 0.5) * 2, // x-axis speed
                        -Math.random() * 3 - 1, // y-axis speed, downward
                        0
                    );

                    scene.add(meteor);
                    this.meteors.push(meteor);

                    // Automatically remove the meteor from the scene after it moves out of view
                    setTimeout(() => {
                        scene.remove(meteor);
                        this.meteors.splice(this.meteors.indexOf(meteor), 1);
                    }, 10000); // Adjust as needed based on the speed and desired duration of the meteor
                }
            },

            addMeteor(scene) {
                // Create a meteor at random intervals
                setInterval(() => {
                    this.createMeteor(scene);
                }, Math.random() * 5000 + 10000); // Every 10 to 15 seconds
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
</style>
