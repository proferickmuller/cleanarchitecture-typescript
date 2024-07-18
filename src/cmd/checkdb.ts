import { SqliteDataSource  } from "../external/datasource/sqlite/main";


(async () => { 
    const datasource = new SqliteDataSource("database/cadastro.db");
    const result = await datasource.listarPessoas();
    console.log(result);
})()