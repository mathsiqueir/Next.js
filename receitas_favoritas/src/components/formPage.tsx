import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from '../app/lib/supabase'

const createRecipeFormSchema = z.object({
  title: z.string().nonempty('Titulo obrigatório'),
  description: z.string().nonempty('Descrição obrigatória'),
  ingredients: z.array(
    z.object({
      name: z.string().nonempty('Ingrediente obrigatório'),
      grams: z.coerce.number().min(1),
    })
  )
})

type createRecipeData = z.input<typeof createRecipeFormSchema>

export function Form() {
  const [output, setOutput] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<createRecipeData>({
    resolver: zodResolver(createRecipeFormSchema)
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  function addNewTech() {
    append({ name: "", grams: 0 });
  }

  async function createRecipe(data: createRecipeData) {
    try {
      const { data: recipe, error } = await supabase
        .from('recipe')
        .insert([
          {
            title: data.title,
            description: data.description,
            ingredients: data.ingredients,
          }
        ]);

      if (error) {
        console.error('Erro ao inserir receita:', error);
        setOutput(JSON.stringify({ error: error.message }, null, 2));
        return;
      }

      setOutput(JSON.stringify({ success: 'Receita criada com sucesso!' }, null, 2));
      reset(); // Limpa o formulário
    } catch (err) {
      console.error('Erro:', err);
      setOutput(JSON.stringify({ error: 'Erro ao criar receita' }, null, 2));
    }
  }
  
  return (
    <main className="h-screen flex items-center justify-center flex-col gap-10 ">
      <form
        onSubmit={handleSubmit(createRecipe)}
        className="bg-gray-600 text-black w-full rounded max-w-md gap-15 p-10"
      >
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="title">Titulo</label>
          <input
            className="border border-zinc-100 shadow-md rounded h-10 px-3"
            type="text"
            id="title"
            {...register("title")}
          />
        </div>

        <div className="flex flex-col gap-1 mt-2 mb-2">
          <label htmlFor="description">Descrição</label>
          <input
            className="border border-zinc-100 shadow-md rounded h-10 px-3"
            type="text"
            id="description"
            {...register("description")}
          />
        </div>

        <div className="flex flex-col gap-1 mt-3 mb-3">
          <div className="flex justify-between items-center gap-1">
            <label>Ingredientes</label>
            <button
              type="button"
              className=" ml-15 rounded bg-emerald-600 w-10"
              onClick={addNewTech}
            >
              +
            </button>
          </div>

          <div className="flex flex-col gap-3 text-black">
            {fields.map((field, index) => (
              <div key={field.id} className="flex ">
                <div className="flex flex-1 flex-col gap-5">
                  <input
                    type="text"
                    placeholder="Ingrediente"
                    className="border border-zinc-300 shadow-2xs rounded h-10 px-3"
                    {...register(`ingredients.${index}.name`)}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <input
                    type="number"
                    className="w-16 border border-zinc-300 shadow-md rounded h-10 px-3"
                    {...register(`ingredients.${index}.grams`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="bg-emerald-500 rounded font-semibold text-white h-10 px-3 hover:bg-emerald-700 hover:transition hover:scale-105">
          Adicionar Receita
        </button>
      </form>
      <pre className=" flex items-center justify-center ">{output}</pre>
    </main>
  );
}
