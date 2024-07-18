import { PessoaGateway } from "../../adapters/gateway/pessoa";
import { PessoaEntity } from "../entities/pessoa";

class PessoaUseCase {
  clienteGateway: PessoaGateway;

  constructor(clienteGateway: PessoaGateway) {
    this.clienteGateway = clienteGateway;
  }

  async cadastrar(nome: string, nascimento: string): Promise<PessoaEntity | null> {
    try {
      var pessoaEntity = new PessoaEntity(nome, nascimento);
      
      var pessoa = this.clienteGateway.incluir(pessoaEntity);
      return pessoa;
    } catch (e) {
      throw e;
    }
  }

  async listar(): Promise<PessoaEntity[]> {
    try {
      var pessoas = this.clienteGateway.listar();
      return pessoas;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async buscar(id: string): Promise<PessoaEntity | null> {
    try {
      var pessoa = this.clienteGateway.buscar(id);
      return pessoa;
    } catch (e) {
      console.log(e);
      return null;
    }
  }


}

export { PessoaUseCase };
