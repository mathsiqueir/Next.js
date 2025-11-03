import spaceships from "@/data/spaceships.json"
import Link from "next/link"

export default function Page() {
  return (
    <main>
      <h1>Todas as Espaçonaves</h1>

      <ul>
        {spaceships.map(ship => (
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