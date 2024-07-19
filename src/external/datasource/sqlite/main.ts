import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { IDataSource } from "../../../pkg/interfaces/datasource";
import { PessoaDTO } from "../../../pkg/dto/pessoa";

const generateId = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        id += chars[randomIndex];
    }
    return id;
};

class SqliteDataSource implements IDataSource {

    private filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }
    buscarPessoaPorNome(nome: string): Promise<PessoaDTO> {
        throw new Error("Method not implemented.");
    }

    async listarPessoas(): Promise<PessoaDTO[]> {
        const db = await open({
            filename: this.filename,
            driver: sqlite3.Database
        });

        const sql = "SELECT id, nome, nascimento FROM pessoa";
        const rows = await db.all(sql);
        if (rows === undefined) {  
            db.close();
            return [];
        }

        const pessoas = rows.map((row) => {
            return {
                id: row.id,
                nome: row.nome,
                nascimento: row.nascimento
            }
        });

        db.close();
        return pessoas;        
    }

    async buscarPessoaPorId(id: string): Promise<PessoaDTO|null> {
        const db = await open({
            filename: this.filename,
            driver: sqlite3.Database
        });

        const sql = "SELECT id, nome, nascimento FROM pessoa WHERE id = ?";
        const row = await db.get(sql, [id]);
        if (row === undefined) {  
            db.close();
            return null;
        }

        db.close();
        return {
            id: row.id,
            nome: row.nome,
            nascimento: row.nascimento
        }
    }
    
    async incluirPessoa(nome: string, nascimento: string): Promise<string|null> {
        const db = await open({
            filename: this.filename,
            driver: sqlite3.Database
        });
        
        const pessoaId = generateId();

        const stmt = "INSERT INTO pessoa (id, nome, nascimento) VALUES (?, ?, ?)";
        try {
            const result = await db.run(stmt, [pessoaId, nome, nascimento]);
            db.close()
            return pessoaId;

        } catch (e) {
            console.log(e);
            db.close()
            return null;

        }

    }
}

export { SqliteDataSource };