import  input  from "@inquirer/input";

import { SqliteDataSource } from "../external/datasource/sqlite/main";
import { PessoaController } from "../adapters/controller/pessoa";

(
    async () => {
        const id = await input({message: "ID a buscar: "});

        const pessoaController = new PessoaController(new SqliteDataSource("database/cadastro.db"));
        
        pessoaController.buscarPorId(id)
            .then((p) => console.log(p))
            .catch((e) => console.log(e));
    }
)()


