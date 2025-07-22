'use client';
import { useMedicion } from '@/app/context/MedicionContext';

export default function Mediciones() {
  const { registro } = useMedicion();

  const exportarCSV = () => {
    const csv = [
      ['#', 'Distancia (cm)', 'Altura de imagen (cm)', 'Aumento lateral'],
      ...registro.map((row, i) => [
        i + 1,
        row.distancia.toFixed(1),
        row.alturaImagen.toFixed(1),
        row.aumento.toFixed(2)
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mediciones_lente_biconvexa.csv';
    link.click();
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">📊 Registro de Mediciones</h1>
      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="w-full text-sm border border-zinc-700">
          <thead className="bg-zinc-800">
            <tr>
              <th>#</th>
              <th>Distancia (cm)</th>
              <th>Altura de imagen (cm)</th>
              <th>Aumento lateral</th>
            </tr>
          </thead>
          <tbody>
            {registro.map((row, i) => (
              <tr key={i} className="hover:bg-zinc-800 text-center">
                <td>{i + 1}</td>
                <td>{row.distancia.toFixed(1)}</td>
                <td>{row.alturaImagen.toFixed(1)}</td>
                <td>{row.aumento.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-6">
          <button
            onClick={exportarCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            📥 Exportar CSV
          </button>
        </div>
      </div>
    </main>
  );
}
