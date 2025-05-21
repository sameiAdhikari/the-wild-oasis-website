"use client";
// const { createContext, useState, useContext } = require("react");
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initialState = { from: undefined, to: undefined };

function ReservationContextProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}
export default function useReservationContext() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("ReservationContext is using outside the provider");
  return context;
}

export { ReservationContextProvider };
