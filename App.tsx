import React, { useState } from 'react';

const App: React.FC = () => {
  // isMounted контролирует наличие модального окна в DOM
  const [isMounted, setIsMounted] = useState(false);
  // isVisible контролирует CSS-классы для анимации (прозрачность)
  const [isVisible, setIsVisible] = useState(false);
  // imageLoaded контролирует загрузку изображения и старт анимации
  const [imageLoaded, setImageLoaded] = useState(false);

  // Данные о художнике
  const artistData = {
    name: "Ашер Браун Дюран",
    years: "1796 — 1886",
    bio: "Американский художник, график и иллюстратор. Яркий представитель Школы реки Гудзон. Известен своими детальными лесными пейзажами и романтическим изображением природы Северной Америки.",
    works: [
      {
        title: "Родственные души (1849)",
        url: "https://sr.gallerix.ru/D/473634388/786082567.jpg"
      },
      {
        title: "Буки (1845)",
        url: "https://sr.gallerix.ru/D/473634388/1178837766.jpg"
      },
      {
        title: "Ущелье Каатерскилл (1866)",
        url: "https://sr.gallerix.ru/D/473634388/610356209.jpg"
      }
    ]
  };

  const openModal = () => {
    setIsMounted(true);
    // Небольшая задержка, чтобы браузер успел отрисовать начальное состояние (opacity-0) перед переходом
    setTimeout(() => setIsVisible(true), 10);
  };

  const closeModal = () => {
    setIsVisible(false);
    // Ждем окончания анимации перед удалением из DOM
    setTimeout(() => setIsMounted(false), 700);
  };

  return (
    <main className="relative w-screen h-screen supports-[height:100dvh]:h-[100dvh] overflow-hidden bg-gray-900 overscroll-none touch-none">
      
      {/* Background Image Layer */}
      {/* Wrapper controls Opacity Fade-In (1s) */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <img
          src="https://storage.yandexcloud.net/unrd-images/background.jpg"
          alt="Background Landscape"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          // Image controls Scale Animation (10s Linear)
          className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${imageLoaded ? 'scale-110' : 'scale-100'}`}
        />
      </div>

      {/* Dark Overlay Layer (60% opacity) */}
      <div className="absolute inset-0 z-10 bg-black/60 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-4">
        
        {/* Center Logo */}
        <div className={`flex-grow flex items-center justify-center transition-opacity duration-1000 delay-500 ${imageLoaded ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}>
          <img 
            src="https://storage.yandexcloud.net/unrd-images/logo.svg" 
            alt="unrd logo"
            className="w-48 md:w-80 h-auto opacity-90 object-contain"
          />
        </div>

        {/* Footer */}
        <footer className={`absolute bottom-8 text-center z-30 transition-opacity duration-1000 delay-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/50 text-sm md:text-base font-light tracking-wider mb-1">
            Саид Гаджиев – 2026
          </p>
          <p className="text-white/30 text-xs md:text-sm font-light">
            Картина «Lake Hamlet» –{' '}
            <button 
              onClick={openModal}
              className="hover:text-white/60 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Ашер Браун Дюран
            </button>
          </p>
        </footer>
      </div>

      {/* Modal Layer */}
      {isMounted && (
        <div 
          className="absolute inset-0 z-50 flex items-center justify-center p-4 overscroll-none"
        >
          {/* Backdrop Blur Overlay with Smooth Opacity Transition */}
          <div 
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-700 ease-in-out cursor-pointer ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeModal}
          />

          {/* Liquid Glass Modal Content */}
          <div 
            className={`relative bg-white/10 backdrop-blur-2xl border border-white/20 text-gray-100 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-700 ease-out transform max-h-[90vh] overflow-y-auto ${
              isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Artist Info */}
            <h2 className="text-2xl font-medium mb-1 text-white tracking-wide">{artistData.name}</h2>
            <p className="text-white/40 text-sm mb-6 font-mono">{artistData.years}</p>
            
            {/* Quote Section - MOVED BEFORE BIO */}
            <blockquote className="relative p-4 mb-6 border-l-2 border-white/40 bg-white/5 rounded-r-lg">
              <p className="text-white/90 font-light leading-relaxed text-sm md:text-base">
                «В мире, где везде AI и искусственные изображения, самобытные картины Дюрана кажутся монументом свободы».
              </p>
              <footer className="mt-2 text-white/40 text-xs font-mono tracking-wide text-right">
                — Саид Гаджиев
              </footer>
            </blockquote>

            {/* Bio */}
            <p className="text-white/80 text-sm leading-relaxed mb-6 border-b border-white/10 pb-6">
              {artistData.bio}
            </p>

            {/* Gallery */}
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">Другие работы</h3>
            <div className="grid grid-cols-3 gap-4">
              {artistData.works.map((work, index) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-lg bg-white/5 border border-white/5 shadow-inner">
                  <img 
                    src={work.url} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default App;