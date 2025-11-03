"use client"
import spaceships from "@/data/spaceships.json"
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"

export default function Page() {
  const { id } = useParams();

  if (!id || typeof id !== 'string') return null;

  const ship = spaceships.find(ship => ship.id === +id)

  if (!ship) return null;

  return (
    <main>
      <h1>{ship.name}</h1>

      <p>
        <Image src={ship.imageUrl} alt={ship.name} width={768} height={432} />
      </p>

      <p>
        <strong>Modelo: </strong>
        {ship.model}
      </p>

      <p>
        <strong>Categoria: </strong>
        {ship.category}
      </p>

      <p>{ship.description}</p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1rem'
      }}>
        <Link href="/spaceships" className="btn">Voltar para Espaçonaves</Link>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            href={`/spaceships/${+id - 1}`}
            className="btn"
            style={{ display: +id === 1 ? 'none' : 'block' }}
          >
            Anterior
          </Link>
          <Link
            href={`/spaceships/${+id + 1}`}
            className="btn"
            style={{ display: +id === spaceships.length ? 'none' : 'block' }}
          >
            Próxima
          </Link>
        </div>
      </div>
    </main>
  )
}