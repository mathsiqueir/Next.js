"use client"

import spaceships from "@/data/spaceships.json"
import Link from "next/link";
import { useParams } from "next/navigation"

export default function Page() {
  const params = useParams();

  if (typeof params.category !== 'string') return null;

  const category = params.category.replace('_', ' ')
  const categorySpaceships = spaceships.filter(ship => ship.category === category)

  return (
    <main>
      <h1>{category}</h1>

      <ul>
        {categorySpaceships.map(ship => (
          <li key={ship.id}>
            <Link
              className="btn"
              href={`/spaceships/${ship.id}`}
            >
              {ship.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}