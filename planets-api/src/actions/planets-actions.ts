'use server'

import { revalidatePath } from "next/cache";

export async function createPlanet(formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');
  const imageUrl = formData.get('imageUrl');

  await fetch(`http://localhost:3000/api/planets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, imageUrl }),
  });

  revalidatePath('/planets');
}

export async function deletePlanet(id: number) {
  await fetch(`http://localhost:3000/api/planets`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  revalidatePath('/planets');
}