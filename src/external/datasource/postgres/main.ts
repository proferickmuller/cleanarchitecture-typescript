import { PessoaDTO } from "../../../pkg/dto/pessoa";
import { IDataSource } from "../../../pkg/interfaces/datasource";

import { Client, connect, SSLMode } from 'ts-postgres';

const generateId = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        id += chars[randomIndex];
    }
    return id;
};

interface Pessoa {
    id: string
    nome: string
    nascimento: string
}

class PostgresDataSource implements IDataSource {
    hostname: string;
    port: number;
    database: string;
    username: string;
    password: string;

    constructor(hostname: string, port: number, database: string, username: string, password: string) {
        this.hostname = hostname;
        this.port = port;
        this.database = database;
        this.username = username;
        this.password = password;
    }

    private async getConnection(): Promise<Client> {
        return await connect({ host: this.hostname, port: this.port, database: this.database, user: this.username, password: this.password, ssl:  SSLMode.Disable });
    }
    
    async listarPessoas(): Promise<PessoaDTO[]> {
        const c = await this.getConnection();
        const sql = "SELECT id, nome, nascimento FROM pessoa";
        const result = await c.query<Pessoa>(sql);

        const returnData = result.rows.map((row) => {
            return {
                id: row.get(`id`),
                nome: row.get(`nome`),
                nascimento: row.get(`nascimento`)
            }
        });
        c.end();
        return returnData;
    }
    async incluirPessoa(nome: string, nascimento: string): Promise<string | null> {
        const sql = "INSERT INTO public.pessoas (id, nome, nascimento) VALUES ($1, $2, $3) RETURNING id";
        const c = await this.getConnection();
        const newId = generateId();
        await c.query(sql, [newId,  nome, nascimento]);
        c.end();
        return newId;
    }

    async buscarPessoaPorId(id: string): Promise<PessoaDTO | null> {
        throw new Error("Method not implemented.");
    }

}

export { PostgresDataSource };