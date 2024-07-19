// import { SqliteDataSource } from "../external/datasource/sqlite/main";
import { PostgresDataSource } from "../external/datasource/postgres/main";
import { PessoaController } from "../adapters/controller/pessoa";

const dataSource = new PostgresDataSource("localhost", 5432, "mydb", "postgres", "hardpass");
// const dataSource = new SqliteDataSource("database/cadastro.db");

const pessoaController = new PessoaController(dataSource);
const id = pessoaController.listar()
    .then((id) => console.log(id))
    .catch((e) => console.log(e));
