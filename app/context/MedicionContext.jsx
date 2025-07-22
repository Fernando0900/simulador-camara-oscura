// app/context/MedicionContext.js
'use client';

import { createContext, useContext, useState } from 'react';

const MedicionContext = createContext();

export function MedicionProvider({ children }) {
  const [registro, setRegistro] = useState([]);

  return (
    <MedicionContext.Provider value={{ registro, setRegistro }}>
      {children}
    </MedicionContext.Provider>
  );
}

export function useMedicion() {
  return useContext(MedicionContext);
}
