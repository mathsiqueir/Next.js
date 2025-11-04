import Image from 'next/image';
import styles from './styles.module.css';

export interface Planet {
  id: number
  name: string
  description: string
  imageUrl: string
}

export interface PlanetItemsProps {
  planet: Planet
  onDelete: (id: number) => void
}

export function PlanetItem({ planet, onDelete }: PlanetItemsProps) {
	return (
	  <div className={styles.planet}>
	    <h2>{planet.name}</h2>
	    <Image
	      src={planet.imageUrl}
	      alt={planet.name}
	      width={320}
	      height={180}
	      style={{ objectFit: 'cover' }}
	    />
	    <p>{planet.description}</p>
	    <button
	      type="button"
	      className={styles.deleteBtn}
	      onClick={() => onDelete(planet.id)}
	    >
	      Excluir
	    </button>
	  </div>
	)
}
