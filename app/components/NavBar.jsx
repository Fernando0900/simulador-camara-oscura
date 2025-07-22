'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { path: '/simulador', label: 'Simulador' },
  { path: '/simulador/mediciones', label: 'Mediciones' },
  { path: '/simulador/teoria', label: 'Teoría' },
  { path: '/simulador/graficas', label: 'Gráficas' }
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-zinc-800 text-white px-4 py-3 flex gap-4 justify-center shadow-md border-b border-zinc-700">
      {routes.map(({ path, label }) => (
        <Link
          key={path}
          href={path}
          className={`px-3 py-1 rounded hover:bg-zinc-700 transition ${
            pathname === path ? 'bg-blue-600 font-semibold' : ''
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
