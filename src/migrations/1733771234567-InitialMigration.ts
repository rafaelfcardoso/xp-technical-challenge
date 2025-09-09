import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1733771234567 implements MigrationInterface {
    name = 'InitialMigration1733771234567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create pessoa_cliente table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`pessoa_cliente\` (
                \`codCliente\` int NOT NULL PRIMARY KEY,
                \`username\` text NOT NULL,
                \`password\` text NOT NULL,
                \`saldo\` double NOT NULL
            ) ENGINE=InnoDB
        `);

        // Create ativos_corretora table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`ativos_corretora\` (
                \`codAtivo\` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                \`ticker\` varchar(5) NOT NULL,
                \`qtdeAtivo\` int NOT NULL,
                \`valor\` double NOT NULL
            ) ENGINE=InnoDB
        `);

        // Create ativos_cliente table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`ativos_cliente\` (
                \`id\` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                \`codCliente\` int NOT NULL,
                \`codAtivo\` int NOT NULL,
                \`qtdeAtivo\` int NOT NULL,
                \`valor\` double NOT NULL,
                INDEX \`IDX_ATIVOS_CLIENTE_CODCLIENTE\` (\`codCliente\`),
                INDEX \`IDX_ATIVOS_CLIENTE_CODATIVO\` (\`codAtivo\`),
                CONSTRAINT \`FK_ATIVOS_CLIENTE_CODCLIENTE\` FOREIGN KEY (\`codCliente\`) REFERENCES \`pessoa_cliente\`(\`codCliente\`) ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT \`FK_ATIVOS_CLIENTE_CODATIVO\` FOREIGN KEY (\`codAtivo\`) REFERENCES \`ativos_corretora\`(\`codAtivo\`) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB
        `);

        // Create ordens_de_compra table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`ordens_de_compra\` (
                \`codCliente\` int NOT NULL,
                \`codAtivo\` int NOT NULL,
                \`qtdeAtivo\` int NOT NULL,
                INDEX \`IDX_ORDENS_COMPRA_CODCLIENTE\` (\`codCliente\`),
                INDEX \`IDX_ORDENS_COMPRA_CODATIVO\` (\`codAtivo\`),
                CONSTRAINT \`FK_ORDENS_COMPRA_CODCLIENTE\` FOREIGN KEY (\`codCliente\`) REFERENCES \`pessoa_cliente\`(\`codCliente\`) ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT \`FK_ORDENS_COMPRA_CODATIVO\` FOREIGN KEY (\`codAtivo\`) REFERENCES \`ativos_corretora\`(\`codAtivo\`) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB
        `);

        // Create ordens_de_venda table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`ordens_de_venda\` (
                \`id\` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                \`codCliente\` int NOT NULL,
                \`codAtivo\` int NOT NULL,
                \`qtdeAtivo\` int NOT NULL,
                INDEX \`IDX_ORDENS_VENDA_CODCLIENTE\` (\`codCliente\`),
                INDEX \`IDX_ORDENS_VENDA_CODATIVO\` (\`codAtivo\`),
                CONSTRAINT \`FK_ORDENS_VENDA_CODCLIENTE\` FOREIGN KEY (\`codCliente\`) REFERENCES \`pessoa_cliente\`(\`codCliente\`) ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT \`FK_ORDENS_VENDA_CODATIVO\` FOREIGN KEY (\`codAtivo\`) REFERENCES \`ativos_corretora\`(\`codAtivo\`) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB
        `);

        // Create depositos table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`depositos\` (
                \`id\` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                \`codCliente\` int NOT NULL,
                \`valor\` double NOT NULL,
                INDEX \`IDX_DEPOSITOS_CODCLIENTE\` (\`codCliente\`),
                CONSTRAINT \`FK_DEPOSITOS_CODCLIENTE\` FOREIGN KEY (\`codCliente\`) REFERENCES \`pessoa_cliente\`(\`codCliente\`) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB
        `);

        // Create saques table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`saques\` (
                \`id\` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                \`codCliente\` int NOT NULL,
                \`valor\` double NOT NULL,
                INDEX \`IDX_SAQUES_CODCLIENTE\` (\`codCliente\`),
                CONSTRAINT \`FK_SAQUES_CODCLIENTE\` FOREIGN KEY (\`codCliente\`) REFERENCES \`pessoa_cliente\`(\`codCliente\`) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`saques\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`depositos\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`ordens_de_venda\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`ordens_de_compra\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`ativos_cliente\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`ativos_corretora\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`pessoa_cliente\``);
    }
}