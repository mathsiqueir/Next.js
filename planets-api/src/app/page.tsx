
import styles from './page.module.css';

 
export default async function Page() {

  return (
    <div className={styles.page}>
      <h1>Planetas</h1>

      <div className={styles.container}>
        <PlanetForm />

        <section className={styles.planets}>
          {planets.map((planet) => (
            <PlanetItem key={planet.id} planet={planet} onDelete={() => null} />
          ))}
        </section>
      </div>
    </div>
  );
};