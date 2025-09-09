import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedData1733771234568 implements MigrationInterface {
    name = 'SeedData1733771234568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert initial broker assets data
        await queryRunner.query(`
            INSERT INTO ativos_corretora (codAtivo, ticker, qtdeAtivo, valor) VALUES
            (1, 'PETR4', 1000000, 29.18),
            (2, 'VALE3', 50000, 68.88),
            (3, 'ABEV3', 2500000, 14.48),
            (4, 'ITUB4', 100000, 23.62),
            (5, 'BBDC3', 500000, 14.33)
            ON DUPLICATE KEY UPDATE 
                ticker = VALUES(ticker),
                qtdeAtivo = VALUES(qtdeAtivo),
                valor = VALUES(valor)
        `);

        // You can add initial client data here if needed
        // await queryRunner.query(`
        //     INSERT INTO pessoa_cliente (codCliente, username, password, saldo) VALUES
        //     (1, 'admin', 'admin', 10000.00)
        //     ON DUPLICATE KEY UPDATE 
        //         username = VALUES(username),
        //         password = VALUES(password),
        //         saldo = VALUES(saldo)
        // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM ativos_corretora WHERE codAtivo IN (1, 2, 3, 4, 5)`);
        // await queryRunner.query(`DELETE FROM pessoa_cliente WHERE codCliente = 1`);
    }
}