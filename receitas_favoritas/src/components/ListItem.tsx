"use client"
import { useEffect, useState } from "react";
import { supabase } from "../app/lib/supabase";
import { Recipe } from "../types/recipe";

export function RecipesList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadRecipes() {
      try {
        const { data, error } = await supabase.from("recipe").select("*")

        if (error) {
          console.error("Erro ao carregar receitas:", error)
          setError(error.message)
          return
        }
        setRecipes(data || [])
      } finally {
        setLoading(false)
      }
    }
    loadRecipes()
  }, [])


  return (
    <div>
      {recipes.length === 0 && <p>Nenhuma receita cadastrada ainda.</p>}

      <div className="flex flex-row flex-1 gap-5">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="rounded text-black p-2 bg-zinc-200 shadow-md  w-50">
            <h3>Titulo: {recipe.title}</h3>
            <p>Descrição: {recipe.description}</p>
            <strong>Ingredientes</strong>
            <ul>
              {recipe.ingredients?.map((ingredient, i) => (
                <li key={i}>
                  {ingredient.name} - {ingredient.grams}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}