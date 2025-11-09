// Guru: 3D Hologram Glow & Rotation
function initGuru3D() {
    // Hero Hologram Preview (mirip globe, tapi dengan multiple spheres untuk representasi guru)
    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x9f7aea, wireframe: true });
    for (let i = 0; i < 14; i++) { // 14 spheres untuk 14 guru
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
        );
        scene.add(sphere);
        gsap.to(sphere.rotation, { y: Math.PI * 2, duration: 5 + Math.random() * 5, repeat: -1, ease: "none" });
        gsap.to(sphere.position, { y: "+=2", duration: 3, yoyo: true, repeat: -1 });
    }

    // Hologram Effect untuk Cards (GSAP + CSS)
    document.querySelectorAll('.3d-hologram').forEach((card, index) => {
        // Tilt 3D
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(card, { 
                rotationY: x / 20, 
                rotationX: -y / 20, 
                duration: 0.3,
                transformPerspective: 1000
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.3 });
        });

        // Hologram Glow & Rotation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
                scale: 1.05, 
                boxShadow: `0 0 30px rgba(159, 122, 234, 0.6)`, // Purple glow
                duration: 0.3 
            });
            gsap.to(card, { rotationY: 360, duration: 1, ease: "power2.inOut" });
            gsap.to(card.querySelector('.hologram-glow > div'), { 
                opacity: 1, 
                scale: 1.2, 
                duration: 0.5 
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
                scale: 1, 
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)', 
                duration: 0.3 
            });
            gsap.to(card.querySelector('.hologram-glow > div'), { 
                opacity: 0, 
                scale: 1, 
                duration: 0.5 
            });
        });

        // Stagger animasi masuk
        gsap.from(card, { 
            y: 50, 
            opacity: 0, 
            duration: 0.8, 
            delay: index * 0.1, 
            ease: "power2.out" 
        });
    });
}

// Tambahkan ke window.load jika belum
window.addEventListener('load', () => {
    if (window.location.pathname.includes('guru.html')) {
        initGuru3D();
    }
});