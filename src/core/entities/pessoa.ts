import { EntityCreationError } from "../../exceptions/entity";

class PessoaEntity {
  nome: string;
  nascimento: string;
  id: string;

  constructor(nome: string, nascimento: string, id: string = "") {
    if (nome.trim() === "" || nascimento.trim() === "") {
      throw EntityCreationError("Campo nao preenchido");
    }

    // validar data de nascimento
    if (!nascimento.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      throw EntityCreationError("Data de nascimento invalida");
    }
    if (new Date(nascimento) > new Date()) {
      throw EntityCreationError("Data de nascimento invalida");
    }

    this.nome = nome;
    this.nascimento = nascimento;
    this.id = id;
  }
}

export { PessoaEntity };
