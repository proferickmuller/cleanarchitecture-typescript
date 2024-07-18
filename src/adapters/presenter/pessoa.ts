import { PessoaEntity } from "../../core/entities/pessoa";

class PessoaPresenter {
    static JsonListaPessoas(pessoas: PessoaEntity[]): string | PromiseLike<string> {
      return JSON.stringify({pessoas: pessoas});
    }
    
    static JsonCriarPessoa(pessoa: PessoaEntity): string | PromiseLike<string> {
        return JSON.stringify(pessoa);
    }
    
    static JsonPessoa(pessoa: PessoaEntity): string | PromiseLike<string> {
        return JSON.stringify(pessoa);
    }
}

export { PessoaPresenter };