'use client';

import { useRef, useEffect, useState } from 'react';
import { useMedicion } from '@/app/context/MedicionContext';

export default function Simulador() {
  const canvasRef = useRef(null);
  const { registro, setRegistro } = useMedicion();

  const [diametro, setDiametro] = useState(1); // diámetro de la lente (cm)
  const [focal, setFocal] = useState(2.5);     // distancia focal (cm)
  const [dO, setDO] = useState(15);           // distancia objeto-lente
  const [h, setH] = useState(9.8);            // altura objeto
  const [modoOscuro, setModoOscuro] = useState(true);

  const descargarImagen = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'simulacion_lente_biconvexa.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const escala = 8.5;
    const originX = 600;
    const originY = canvas.height / 2;
    const objetoX = originX - dO * escala;
    const objetoY = originY;

    const dI = 1 / (1 / focal - 1 / dO); // fórmula de lentes
    const pantallaX = originX + dI * escala;

    const h_px = h * escala;
    const M = -dI / dO;
    const h_img = h * M;
    const h_img_px = h_img * escala;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo cuadrícula
    ctx.strokeStyle = modoOscuro ? '#333' : '#ccc';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Lente
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'blue';
    ctx.moveTo(originX, originY - 60);
    ctx.quadraticCurveTo(originX + diametro * 2, originY, originX, originY + 60);
    ctx.moveTo(originX, originY - 60);
    ctx.quadraticCurveTo(originX - diametro * 2, originY, originX, originY + 60);
    ctx.stroke();

    // Objeto
    ctx.fillStyle = 'white';
    ctx.fillRect(objetoX - 2, objetoY - h_px / 2, 4, h_px);
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(objetoX, objetoY - h_px / 2 - 5, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Imagen
    ctx.fillStyle = 'white';
    ctx.fillRect(pantallaX - 2, objetoY - h_img_px / 2, 4, h_img_px);
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(pantallaX, objetoY - h_img_px / 2 - 5 * Math.sign(h_img), 3, 0, 2 * Math.PI);
    ctx.fill();

    // Rayos
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(objetoX, objetoY - h_px / 2);
    ctx.lineTo(originX, objetoY - h_px / 2);
    ctx.lineTo(pantallaX, objetoY - h_img_px / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(objetoX, objetoY - h_px / 2);
    ctx.lineTo(originX, objetoY);
    ctx.lineTo(pantallaX, objetoY - h_img_px / 2);
    ctx.stroke();
  }, [diametro, focal, dO, h, modoOscuro]);

  const registrarMedicion = () => {
    const dI = 1 / (1 / focal - 1 / dO);
    const M = -dI / dO;
    const h_img = h * M;
    const nuevaMedicion = {
      n: registro.length + 1,
      distancia: parseFloat(dI.toFixed(2)),
      alturaImagen: parseFloat(h_img.toFixed(2)),
      aumento: parseFloat(M.toFixed(2)),
    };
    setRegistro([...registro, nuevaMedicion]);
  };

  return (
    <main className={`min-h-screen ${modoOscuro ? 'bg-zinc-900 text-white' : 'bg-white text-black'} p-6`}>
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">Simulador de Lente Biconvexa</h1>
        <p className="text-sm text-zinc-400">Interacción óptica con lentes convergentes</p>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={() => setModoOscuro(!modoOscuro)} className="px-3 py-1 text-sm rounded bg-zinc-700 hover:bg-zinc-600">
            {modoOscuro ? '🌙 Oscuro' : '☀️ Claro'}
          </button>
          <button onClick={descargarImagen} className="px-3 py-1 text-sm rounded bg-green-700 hover:bg-green-600">
            📸 Capturar PNG
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-4">
          <div>
            <label>Diámetro de la lente: {diametro} cm</label>
            <input type="range" min={0.5} max={6} step={0.1} value={diametro} onChange={e => setDiametro(parseFloat(e.target.value))} className="w-full" />
          </div>
          <div>
            <label>Distancia focal: {focal} cm</label>
            <input type="range" min={1} max={20} step={0.1} value={focal} onChange={e => setFocal(parseFloat(e.target.value))} className="w-full" />
          </div>
          <div>
            <label>Distancia al objeto: {dO} cm</label>
            <input type="range" min={1} max={100} step={0.5} value={dO} onChange={e => setDO(parseFloat(e.target.value))} className="w-full" />
          </div>
          <div>
            <label>Altura del objeto: {h} cm</label>
            <input type="range" min={1} max={40} step={0.1} value={h} onChange={e => setH(parseFloat(e.target.value))} className="w-full" />
          </div>
          <button onClick={registrarMedicion} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Registrar medición
          </button>
        </div>

        <div className="md:w-2/3 flex justify-center pl-10">
          <canvas ref={canvasRef} width={1100} height={650} className="border border-zinc-600 rounded" />
        </div>
      </div>
    </main>
  );
}