import { useState } from "react";
import "../index.css"; // 👈 Asegúrate de tener esto

export default function IronmanHUD() {
  const [energy] = useState(78);

  return (
    <div className="relative w-full h-screen bg-black text-cyan-400 font-mono overflow-hidden">
    
     {/* Contenedor central */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
  
<a href="https://nov-ias-com.onrender.com" target="_blank" rel="noopener noreferrer">
  <div className="cursor-pointer w-40 h-40 border-4 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_30px_#00ffff] animate-pulse-glow hover:scale-110 transition-transform">
 {/* Círculo con pulso multicolor */}
<div className="w-40 h-40 border-4 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_30px_#00ffff]">
  <div className="w-24 h-24 rounded-full animate-pulse-multicolor"></div>
</div>


  </div>
</a>



  {/* Texto principal debajo del círculo */}
  <div className="mt-6">
    <h1
      className="text-2xl md:text-4xl font-bold tracking-widest animate-pulse text-cyan-400"
      style={{
        textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff"
      }}
    >
      
      FREE IA
    </h1>
    <p
      className="text-lg mt-2 text-cyan-300"
      style={{
        textShadow: "0 0 6px #00ffff, 0 0 12px #00ffff"
      }}
    >
      Energía: {energy}%
    </p>
  </div>
</div>

  

      {/* Indicadores laterales */}
      <div className="absolute top-10 left-10 space-y-2">
        <p className="text-sm">Temperatura: 36°C</p>
        <p className="text-sm">Pulso: 72bpm</p>
      </div>

      <div className="absolute bottom-10 right-10 text-right space-y-2">
        <p className="text-sm">Objetivo: En línea</p>
        <p className="text-sm">Armadura lista</p>
      </div>
    </div>
  );
}
