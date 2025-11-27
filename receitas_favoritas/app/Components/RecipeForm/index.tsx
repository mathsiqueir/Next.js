import { registerRecipe } from "@/app/actions";
import { useState } from "react";

export default function Page(){
  const [ingredients, setIngredients] = useState([])
  return(
     <div className="container mt-4">
      <form className="p-4 border rounded bg-light shadow-sm">

        {/* TÍTULO */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Título
          </label>
          <input type="text" name="title" id="title" className="form-control" />
        </div>

        {/* DESCRIÇÃO */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descrição
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="form-control"
          />
        </div>

        {/* INGREDIENTES */}
        <div className="mb-3">
          <label className="form-label">Ingredientes</label>

          {ingredients.map((item, index) => (
            <div key={index} className="row g-2 mb-2 align-items-center">

              <div className="col">
                <input
                  type="text"
                  placeholder="Ingrediente"
                  value={item.name}
                  onChange={(e) =>
                    updateIngredient(index, "name", e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <div className="col-3">
                <input
                  type="text"
                  placeholder="Gramas"
                  value={item.grams}
                  onChange={(e) =>
                    updateIngredient(index, "grams", e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <div className="col-auto">
                <button
                  type="button"
                  onClick={addIngredient}
                  className="btn btn-success"
                >
                  +
                </button>
              </div>

              {ingredients.length > 1 && (
                <div className="col-auto">
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="btn btn-danger"
                  >
                    -
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* IMAGEM */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Imagem
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
          />
        </div>

        {/* BOTÃO */}
        <button className="btn btn-primary w-100">Enviar</button>
      </form>
    </div>
  )
}