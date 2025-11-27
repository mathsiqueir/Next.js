"use client"
import { useState } from "react";
import RecipeForm from "./Components/RecipeForm";


export default function Home() {
  const [showForm, setShowForm] = useState(false)
  return (
    <div>
      <h1 className="text-2xl">Receitas Favoritas</h1>
      {/* <div
      onClick={() => setShowForm(!showForm)}>
        Adicionar
      </div>
      {showForm? <RecipeForm/> :null} */}
      <RecipeForm/>
    </div>
  );
}
