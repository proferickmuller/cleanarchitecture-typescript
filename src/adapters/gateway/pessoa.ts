import { PessoaEntity } from "../../core/entities/pessoa";
import { PessoaDTO } from "../../pkg/dto/pessoa";
import { IDataSource } from "../../pkg/interfaces/datasource";

class PessoaGateway {
  
  private datasource;

  constructor(datasource: IDataSource) {
    this.datasource = datasource;
  }

  async buscar(id: string): Promise<PessoaEntity|null> {
    const pessoaDTO = await this.datasource.buscarPessoaPorId(id);
    
    if (pessoaDTO === null) {
      return null;
    }
    
    return this.fromDTOToEntity(pessoaDTO);
  }
  
  async incluir(pessoa: PessoaEntity): Promise<PessoaEntity> {
    if (pessoa.id !== "") {
      throw new Error("Pessoa ja existe");	
    }

    const pessoaId = await this.datasource.incluirPessoa(pessoa.nome, pessoa.nascimento);
    
    if (!pessoaId) {
      throw new Error("Erro ao incluir pessoa");
    } 

    pessoa.id = pessoaId;
    return pessoa;
  }

  async listar(): Promise<PessoaEntity[]> {
    const pessoas = await this.datasource.listarPessoas();
    const pessoasEntity = pessoas.map((pessoa) => {
      return this.fromDTOToEntity(pessoa);
    })
    return pessoasEntity;
  }

  private fromEntityToDTO(pessoa: PessoaEntity): PessoaDTO {
    return {
      id: pessoa.id,
      nome: pessoa.nome,
      nascimento: pessoa.nascimento
    }
  }

  private fromDTOToEntity(pessoa: PessoaDTO): PessoaEntity {
    return new PessoaEntity(pessoa.nome, pessoa.nascimento, pessoa.id);
  }
}

export { PessoaGateway };