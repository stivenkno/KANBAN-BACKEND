const query = `
  CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS projects (
    id_project SERIAL PRIMARY KEY,
    title_project VARCHAR(255) NOT NULL,
    id_user INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
  );

  CREATE TABLE IF NOT EXISTS columns (
    id_column SERIAL PRIMARY KEY,
    title_column VARCHAR(255) NOT NULL,
    id_project INT NOT NULL,
    id_user INT NOT NULL,
    position SERIAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_project) REFERENCES projects(id_project),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id_task SERIAL PRIMARY KEY,
    title_task VARCHAR(255) NOT NULL,
    id_column INT NOT NULL,
    id_user INT NOT NULL,
    position INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_column) REFERENCES columns(id_column),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
  );
`;

export default query;
