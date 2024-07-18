import { SqliteDataSource } from "../external/datasource/sqlite/main";
import { PessoaController } from "../adapters/controller/pessoa";

const pessoaController = new PessoaController(new SqliteDataSource("database/cadastro.db"));
const id = pessoaController.listar()
    .then((id) => console.log(id))
    .catch((e) => console.log(e));
