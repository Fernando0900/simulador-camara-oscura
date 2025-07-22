'use client';

export default function Teoria() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">📘 Fundamento Teórico</h1>

        <p className="mb-4 text-lg">
          Una <strong>cámara oscura</strong> es un dispositivo óptico que permite proyectar una imagen invertida del mundo exterior a través de un pequeño orificio sobre una pantalla opuesta. Este principio se basa en la propagación rectilínea de la luz.
        </p>

        <div className="bg-zinc-800 p-4 rounded shadow-md space-y-4">
          <div>
            <strong>1. Área del orificio (A):</strong>
            <p>
              <span className="text-yellow-400">A = π · r²</span>
              <br />
              Donde <code>r</code> es el radio del orificio.
            </p>
          </div>

          <div>
            <strong>2. Aumento lateral (M):</strong>
            <p>
              <span className="text-green-400">M = d<sub>i</sub> / d<sub>o</sub></span>
              <br />
              Mide el grado de ampliación o reducción de la imagen.
            </p>
          </div>

          <div>
            <strong>3. Altura proyectada (h′):</strong>
            <p>
              <span className="text-blue-400">h′ = h · M</span>
              <br />
              La imagen es proporcional a la altura real del objeto multiplicada por el aumento.
            </p>
          </div>

          <div>
            <strong>4. Intensidad relativa (I):</strong>
            <p>
              <span className="text-purple-400">I ∝ A / d<sub>i</sub>²</span>
              <br />
              La intensidad de la luz proyectada depende directamente del área del orificio e inversamente del cuadrado de la distancia de proyección.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-zinc-400">
          📌 Este experimento simula la proyección real de una figura sobre una superficie, evaluando cómo varía la intensidad, tamaño y dirección según los parámetros configurados.
        </p>
      </div>
    </main>
  );
}
