type PessoaDTO = {
    id: string;
    nome: string;
    nascimento: string;
};

function PessoaDTO(id: string, nome: string, nascimento: string): PessoaDTO {
    return { id, nome, nascimento };
}

export { PessoaDTO }