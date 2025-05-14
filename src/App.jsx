import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Confetti from 'react-confetti';
import Fireworks from './components/Fireworks';
import './App.css';

const App = () => {
  const friendName = "Nhưỡng";
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    // Balloon animations
    gsap.to('.balloon', {
      y: -150,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2,
    });

    // Cursor-following balloons
    document.addEventListener('mousemove', (e) => {
      gsap.to('.cursor-balloon', {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
      });
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden 
                    bg-gradient-to-br from-pink-600 via-red-700 to-purple-700 text-gray-900"
                    style={{
                      background: 'linear-gradient(135deg,rgb(255, 187, 211) 0%,rgb(255, 185, 213) 50%,rgb(250, 247, 255) 100%)',
                      height: '100vh',
                      overflow: 'hidden',
                      width: '100vw',
                    }}
                    >

     
      <Confetti className="pointer-events-none" />

      {/* Khi showFireworks = true, chỉ render Fireworks */}
      {showFireworks && <Fireworks />}

      {/* Khi showFireworks = false, render phần nội dung chính */}
      {!showFireworks && (
        <div className="relative z-10 text-center p-8 max-w-xl mx-auto
                        bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-pink-100">
          <h1 className="text-5xl md:text-7xl font-extrabold text-pink-600 drop-shadow-lg animate-bounce-slow">
            Chúc mừng sinh nhật người đẹp, {friendName}!
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700 font-medium">
            Chúc người đẹp một ngày sinh nhật tràn ngập niềm vui, tiếng cười và những khoảnh khắc đáng nhớ! 🎉
          </p>
          <p className="mt-2 text-base md:text-lg text-gray-700 font-medium">
            Tuổi mới, hãy tỏa sáng như những bài báo đỉnh cao, truyền cảm hứng và chinh phục mọi thử thách trong nghề báo chí! 📰✨
          </p>
          <button
            onClick={() => setShowFireworks(true)}
            className="mt-6 inline-flex items-center gap-2
                       bg-gradient-to-r from-pink-500 to-purple-600
                       text-white text-lg font-semibold
                       px-8 py-3 rounded-full shadow-lg
                       hover:scale-105 hover:shadow-glow
                       transition-all duration-300 animate-float-horizontal"
          >
            Bấm vào đây đi! 🎆
          </button>
          <img
            src="/cake-removebg-preview.png"
            alt="Birthday Cake"
            className="mt-8 mx-auto w-40 md:w-56 animate-pulse-slow"
          />
        </div>
      )}

      {/* Floating balloons */}
      <div className="balloon fixed w-14 h-14 bg-gradient-to-b from-red-400 to-red-600 rounded-full 
                      bottom-0 left-10 mix-blend-lighten opacity-90 shadow-md" />
      <div className="balloon fixed w-16 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full 
                      bottom-0 left-1/4 mix-blend-lighten opacity-90 shadow-md" />
      <div className="balloon fixed w-12 h-12 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full 
                      bottom-0 left-1/2 mix-blend-lighten opacity-90 shadow-md" />

      {/* Cursor-following balloon */}
      <div className="cursor-balloon fixed w-10 h-10 bg-gradient-to-b from-purple-400 to-purple-600 
                      rounded-full pointer-events-none shadow-xl animate-pulse" />
    </div>
  );
};

export default App;
