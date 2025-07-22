'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMedicion } from '../context/MedicionContext';

function Lente({ diametro }) {
  return (
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[diametro / 2, diametro / 2, 0.5, 32]} />
      <meshPhysicalMaterial color="skyblue" transmission={0.9} thickness={0.5} />
    </mesh>
  );
}

function RayoLuz({ x }) {
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([x, 0, -20, 0, 0, 20])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="yellow" linewidth={2} />
    </line>
  );
}

function Pantalla({ posicion }) {
  return (
    <mesh position={[posicion, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial color="white" side={2} transparent opacity={0.5} />
    </mesh>
  );
}

export default function SimuladorLenteBiconvexa() {
  const { registro, setRegistro } = useMedicion();
  const [distancia, setDistancia] = useState(15);
  const [focal, setFocal] = useState(2.5);
  const [diametro, setDiametro] = useState(3);
  const alturaObjeto = 9.8;

  const calcular = () => {
    const inversa_s = 1 / focal - 1 / distancia;
    const s_prima = 1 / inversa_s;
    const aumento = -s_prima / distancia;
    const alturaImagen = aumento * alturaObjeto;

    const nuevaMedicion = {
      n: registro.length + 1,
      distancia: parseFloat(distancia.toFixed(2)),
      alturaImagen: parseFloat(alturaImagen.toFixed(2)),
      aumento: parseFloat(aumento.toFixed(2)),
    };

    setRegistro([...registro, nuevaMedicion]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-2/3 h-[400px] bg-gray-100">
        <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <Lente diametro={diametro} />
          <RayoLuz x={-diametro / 2 + 0.1} />
          <RayoLuz x={0} />
          <RayoLuz x={diametro / 2 - 0.1} />
          <Pantalla posicion={focal} />
          <OrbitControls />
        </Canvas>
      </div>
      <div className="w-full md:w-1/3 space-y-4">
        <div>
          <label className="block">Distancia del objeto (cm): {distancia}</label>
          <input type="range" min="1" max="40" value={distancia} onChange={(e) => setDistancia(parseFloat(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block">Distancia focal (cm): {focal}</label>
          <input type="range" min="0.5" max="10" step="0.1" value={focal} onChange={(e) => setFocal(parseFloat(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block">Diámetro de la lente (cm): {diametro}</label>
          <input type="range" min="1" max="10" step="0.1" value={diametro} onChange={(e) => setDiametro(parseFloat(e.target.value))} className="w-full" />
        </div>
        <button onClick={calcular} className="px-4 py-2 bg-blue-500 text-white rounded">Registrar</button>
        <div>
          <h3 className="font-bold mt-4">Datos registrados</h3>
          <table className="w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th>#</th>
                <th>Distancia (cm)</th>
                <th>Altura imagen (cm)</th>
                <th>Aumento</th>
              </tr>
            </thead>
            <tbody>
              {registro.map((m) => (
                <tr key={m.n} className="text-center">
                  <td>{m.n}</td>
                  <td>{m.distancia}</td>
                  <td>{m.alturaImagen}</td>
                  <td>{m.aumento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}