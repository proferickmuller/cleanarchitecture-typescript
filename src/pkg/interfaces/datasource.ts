import { PessoaDTO } from "../dto/pessoa";

interface IDataSource {
  buscarPessoaPorNome(nome: string): Promise<PessoaDTO>;
  listarPessoas(): Promise<PessoaDTO[]>;
  incluirPessoa(nome: string, nascimento: string): Promise<string|null>;
  buscarPessoaPorId(id: string): Promise<PessoaDTO | null>;
}

export { IDataSource };