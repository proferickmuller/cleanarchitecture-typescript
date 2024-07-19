import  input  from "@inquirer/input";

// import { SqliteDataSource } from "../external/datasource/sqlite/main";
import { PessoaController } from "../adapters/controller/pessoa";
import { PostgresDataSource } from "../external/datasource/postgres/main";



(
    async () => {
        const id = await input({message: "ID a buscar: "});

        // const dataSource = new SqliteDataSource("database/cadastro.db");
        const dataSource = new PostgresDataSource("localhost", 5432, "mydb", "postgres", "hardpass");
        const pessoaController = new PessoaController(dataSource);

        pessoaController.buscarPorId(id)
            .then((p) => console.log(p))
            .catch((e) => console.log(e));
    }
)()


