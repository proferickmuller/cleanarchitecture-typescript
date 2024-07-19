import { PessoaUseCase } from "../../core/usecases/pessoa";
import { PessoaDTO } from "../../pkg/dto/pessoa";
import { IDataSource } from "../../pkg/interfaces/datasource";
import { PessoaGateway } from "../gateway/pessoa";
import { PessoaPresenter } from "../presenter/pessoa";

class PessoaController {
  private datasource: IDataSource;

  constructor(datasource: IDataSource) {
    this.datasource = datasource;
  }

  async cadastrar(nome: string, nascimento: string): Promise<string | null> {
    const pessoaGateway = new PessoaGateway(this.datasource);
    const useCase = new PessoaUseCase(pessoaGateway);
    try {
      const pessoa = await useCase.cadastrar(nome, nascimento);
      if (!pessoa) {
        return null
      }
      return PessoaPresenter.JsonCriarPessoa(pessoa);
    }
    catch (e) {
      throw new Error("Erro ao incluir pessoa");
    }

  }

  async listar(): Promise<string> {
    const pessoaGateway = new PessoaGateway(this.datasource);
    const useCase = new PessoaUseCase(pessoaGateway);
    const pessoas = await useCase.listar();
    
    return PessoaPresenter.JsonListaPessoas(pessoas) ;
  }

  async buscarPorNome(nome: string): Promise<string|null> {
    const pessoaGateway = new PessoaGateway(this.datasource);
    const useCase = new PessoaUseCase(pessoaGateway);
    const pessoa = await useCase.buscarPorNome(nome);
    
    if (!pessoa) {
      return null;
    }
    
    return PessoaPresenter.JsonPessoa(pessoa) ;
  }

  async buscarPorId(id: string): Promise<string|null> {
    const pessoaGateway = new PessoaGateway(this.datasource);
    const useCase = new PessoaUseCase(pessoaGateway);
    const pessoa = await useCase.buscar(id);
    
    if (!pessoa) {
      return null;
    }
    
    return PessoaPresenter.JsonPessoa(pessoa) ;
  }
}

export { PessoaController };