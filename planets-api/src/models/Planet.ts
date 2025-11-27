import { Planet, PlanetItem } from '@/app/components/Planet';
import { pool } from '../database/pool';
export async function getPlanets(){
  const result = await pool.query('SELECT id, name, description, image_url AS "i" FROM planets;')
  const planets: Planet[] = result.rows
}