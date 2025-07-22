'use client';

import { useMedicion } from '@/app/context/MedicionContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Graficas() {
  const { registro } = useMedicion();

  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-100 p-6">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">📈 Análisis Gráfico</h1>
        <p className="text-zinc-400 text-sm">Visualiza cómo varían las variables del experimento de la lente biconvexa.</p>
      </header>

      {registro.length === 0 ? (
        <p className="text-center text-sm text-zinc-400">No hay datos registrados aún. Vuelve a la vista principal y registra mediciones.</p>
      ) : (
       <section className="flex flex-col gap-6">

          {/* Altura de la imagen vs Distancia del objeto */}
          <div className="bg-zinc-800 p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Altura de la imagen vs Distancia del objeto</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={registro}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="distancia" label={{ value: 'Distancia del objeto (cm)', position: 'insideBottom', dy: 10 }} />
                <YAxis label={{ value: 'Altura de la imagen (cm)', angle: -90, dx: -10 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="alturaImagen" name="Altura de la imagen (cm)" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Aumento lateral vs Distancia del objeto */}
          <div className="bg-zinc-800 p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Aumento lateral vs Distancia del objeto</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={registro}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="distancia" label={{ value: 'Distancia del objeto (cm)', position: 'insideBottom', dy: 10 }} />
                <YAxis label={{ value: 'Aumento lateral', angle: -90, dx: -10 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="aumento" name="Aumento lateral" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}
    </main>
  );
}
