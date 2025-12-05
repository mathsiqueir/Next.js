"use client"
import { useState } from "react";
import { Form } from '../components/formPage'
import { RecipesList } from '../components/ListItem'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  
  const toggleForm = () => setShowForm(!showForm)

  return (
    <div className="bg-zinc-900 text-white min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Receitas Favoritas</h1>
        <button 
          type="button" 
          onClick={toggleForm}
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 transition-colors duration-200"
          aria-label="Adicionar nova receita"
        >
          +
        </button>
      </div>
      {showForm && <Form />}

      <RecipesList />
    </div>
  );
}