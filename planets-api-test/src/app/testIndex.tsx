"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserFormSchema = z.object({
  avatar: z.instanceof(FileList)
    .transform((list) => list.item(0))
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "O arquivo deve ter até 5MB"
    ),
  name: z
    .string()
    .nonempty("Nome é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .toLowerCase()
    .refine((email) => email.endsWith("@gmail.com"), "O e-mail precisa ser do gmail"),
  password: z.string().min(6, "A senha precisa no mínimo 6 caracteres"),
  techs: z
    .array(
      z.object({
        title: z.string().trim().nonempty("O título é obrigatório"),
        knowledge: z.coerce.number().min(1).max(100),
      })
    )
    .min(2, "insira pelo menos duas tecnologias")
    .refine(
      (techs) => techs.some((tech) => tech.knowledge > 50),
      "Você está aprendendo"
    ),
});

type createUserData = z.input<typeof createUserFormSchema>;


export default function Home() {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<createUserData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const { fields, append } = useFieldArray({
    name: "techs",
    control,
  });

  function createUser(data: createUserData) {
    console.log(data.avatar);
    setOutput(JSON.stringify(data, null, 2));
  }

  function addNewTech() {
    append({ title: "", knowledge: 0 });
  }

  return (
    <main className="h-screen bg-zinc-800 flex items-center justify-center flex-col gap-15">
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-10 bg-gr text-black p-10 rounded w-full  max-w-md"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="avatar">avatar</label>
          <input
            type="file"
            id="avatar"
            className="border border-zinc-100 shadow-md rounded h-10 px-3"
            {...register("avatar")}
          />
          {errors?.avatar && (
            <span className="text-red-500 text-sm">{errors.avatar?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            id="name"
            className="border border-zinc-100 shadow-md rounded h-10 px-3"
            {...register("name")}
          />
          {errors?.name && (
            <span className="text-red-500 text-sm">{errors.name?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            className="border border-zinc-100 shadow-md rounded h-10 px-3"
            {...register("email")}
          />
          {errors?.email && (
            <span className="text-red-500 text-sm">{errors.email?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">senha</label>
          <input
            type="password"
            id="password"
            className="border border-zinc-100 shadow-md rounded h-10 px-3"
            {...register("password")}
          />
          {errors?.password && (
            <span className="text-red-500 text-sm">{errors.password?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center gap-20">
            <label className="">Tecnologias</label>
            <button
              type="button"
              onClick={addNewTech}
              className="shadow-md px-2 rounded text-white bg-emerald-500 hover:scale-105 hover:bg-emerald-700 hover:transition-all"
            >
              Add
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 ">
              <div className="flex flex-1 flex-col gap-1">
                <input
                  type="text"
                  className="border border-zinc-300 shadow-md rounded h-10 px-3"
                  {...register(`techs.${index}.title`)}
                />
                {errors?.techs?.[index]?.title && (
                  <span className="text-red-500 text-sm">
                    {errors.techs?.[index]?.title?.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col flex-1">
                <input
                  type="number"
                  className="w-12 border border-zinc-300 shadow-md rounded h-10 px-3"
                  {...register(`techs.${index}.knowledge`)}
                />
                {errors?.techs?.[index]?.knowledge && (
                  <span className="text-red-500 text-sm">
                    {errors.techs?.[index]?.knowledge?.message}
                  </span>
                )}
              </div>
            </div>
          ))}
          {errors.techs && (
            <span className="text-red-500 text-sm">{errors.techs.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-700 hover:transition hover:scale-105"
        >
          Salvar
        </button>
      </form>

      <pre>{output}</pre>
    </main>
  );
}