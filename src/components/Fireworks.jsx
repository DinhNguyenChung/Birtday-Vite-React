import { useEffect, useRef } from 'react';

const Fireworks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const images = [
      '/cake.png',
      '/gift.png',
      '/star.png',
    ].map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const createParticle = (x, y) => {
      return {
        x,
        y,
        vx: (Math.random() * 2 - 1) * 0.5 , // Giảm vận tốc ngang để trôi nhẹ
        vy: (Math.random() * -3 - 1) * 0.5, // Vận tốc dọc âm để bay lên
        size: Math.random() * 80 + 100, // Kích thước ảnh từ 20-40px
        image: images[Math.floor(Math.random() * images.length)],
        rotation: Math.random() * Math.PI * 2, // Góc xoay ban đầu
        rotationSpeed: (Math.random() * 0.05 - 0.025) * 0.5, // Tốc độ xoay
        alpha: 1,
      };
    };

    const createExplosion = (x, y) => {
      for (let i = 0; i < 20; i++) { // Giảm số lượng để hiệu ứng nhẹ hơn
        particles.push(createParticle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        // Cập nhật vị trí và thuộc tính
        particle.x += particle.vx;
        particle.y += particle.vy;
         particle.alpha -= 0.005; // Mờ dần chậm hơn
        particle.rotation += particle.rotationSpeed;

        // Vẽ ảnh
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.drawImage(
          particle.image,
          -particle.size / 2,
          -particle.size / 2,
          particle.size,
          particle.size
        );
        ctx.restore();

        // Xóa hạt khi mờ hoàn toàn
        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        }
      });

      // Tạo vụ nổ ngẫu nhiên
      if (Math.random() < 0.04) {
        createExplosion(Math.random() * canvas.width, Math.random() * canvas.height / 2);
      }

      requestAnimationFrame(animate);
    };

    // Đợi tất cả ảnh tải xong trước khi bắt đầu
    Promise.all(
      images.map((img) => new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; // Tiếp tục ngay cả khi ảnh lỗi
      }))
    ).then(() => {
      animate();
    });

    return () => {
      particles.length = 0;
    };
  }, []);

  return <canvas ref={canvasRef}
  className="fixed inset-0 w-screen h-screen pointer-events-none z-50"
  // className="absolute inset-0" 
  />;
};

export default Fireworks;