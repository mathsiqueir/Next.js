import pg from 'pg';

  const pool = new pg.Pool({
    connectionString: 'postgres://postgres:8108@localhost:5433/postgres'
  })
 


  export {pool}