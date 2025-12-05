import React from 'react';

const App: React.FC = () => {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gray-900">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="./background.jpg"
          alt="Background Landscape"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay Layer (60% opacity) */}
      <div className="absolute inset-0 z-10 bg-black/60 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-4">
        
        {/* Center Logo */}
        <div className="flex-grow flex items-center justify-center animate-fade-in">
          <img 
            src="./logo.svg" 
            alt="Logo" 
            className="w-24 h-24 md:w-32 md:h-32 opacity-90 object-contain"
          />
        </div>

        {/* Footer */}
        <footer className="absolute bottom-8 text-center select-none">
          <p className="text-white/50 text-sm md:text-base font-light tracking-wider">
            Саид Гаджиев – 2026
          </p>
        </footer>

      </div>
    </main>
  );
};

export default App;