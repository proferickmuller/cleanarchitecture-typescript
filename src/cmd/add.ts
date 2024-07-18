import  input  from "@inquirer/input";
import pc from "picocolors";

import { SqliteDataSource } from "../external/datasource/sqlite/main";
import { PessoaController } from "../adapters/controller/pessoa";
import { PostgresDataSource } from "../external/datasource/postgres/main";

(async () => {
    const nome = await input({message: "Nome: "});
    const nascimento = await input({message: "Nascimento (dd/mm/aaaa): "}); 

    //const pessoaController = new PessoaController(new SqliteDataSource("database/cadastro.db"));
    const psql = new PostgresDataSource("localhost", 5432, "mydb", "postgres", "hardpass");
    const pessoaController = new PessoaController(psql);
    try {
        const response = await pessoaController.cadastrar(nome, nascimento);
        if (response === null) {
            console.log(pc.red("Erro ao incluir pessoa"));
            return;
        }
        const pessoa = JSON.parse(response);
        console.log(pc.green(`Pessoa com ID: ${pessoa.id} incluída com sucesso!`));
    } catch (e) {
        console.log(pc.red("Erro ao incluir pessoa."));
    }

    return;
})();
