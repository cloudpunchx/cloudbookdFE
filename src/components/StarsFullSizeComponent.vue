<template>
    <div ref="starsContainer" class="stars-container"></div>
</template>

<script>
    import * as THREE from "three";

    export default {
        name: "StarsFullSizeComponent",
        data() {
            return {
                camera: null,
                scene: null,
                renderer: null,
                meteors: [],
            };
        },
        mounted() {
            this.initThreeJS();
            window.addEventListener("resize", this.handleResize);
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.handleResize);
        },
        methods: {
            initThreeJS() {
                const container = this.$refs.starsContainer;
                this.scene = new THREE.Scene();
                const width = container.offsetWidth;
                const height = container.offsetHeight;

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

                this.createStars(1000);
                this.addMeteor();

                this.animate();
            },

            createStars(count) {
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
                    this.scene.add(star);
                }
            },

            createMeteor() {
                if (this.meteors.length < 1) {
                    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
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
                }
            },

            addMeteor() {
                setInterval(() => {
                    this.createMeteor();
                }, Math.random() * 5000 + 10000); // Every 10 to 15 seconds
            },

            animate() {
                requestAnimationFrame(this.animate);
                this.renderer.render(this.scene, this.camera);
            },

            handleResize() {
                const container = this.$refs.starsContainer;
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
    .stars-container {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        /* z-index: 1; */
    }
</style>
