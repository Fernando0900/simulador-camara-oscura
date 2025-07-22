import './globals.css';
import { Inter } from 'next/font/google';
import { MedicionProvider } from './context/MedicionContext';
import NavBar from './components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Simulador Cámara Oscura',
  description: 'Proyecto óptico con análisis interactivo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <MedicionProvider>
          <NavBar />
          {children}
        </MedicionProvider>
      </body>
    </html>
  );
}
