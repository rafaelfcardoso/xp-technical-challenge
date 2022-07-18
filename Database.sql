DROP DATABASE IF EXISTS desafio_xp;

CREATE DATABASE desafio_xp;

USE desafio_xp;

CREATE TABLE pessoa_cliente (
    CodCliente INTEGER PRIMARY KEY NOT NULL,
    Saldo DOUBLE NOT NULL
) ENGINE=INNODB;

CREATE TABLE autenticacao_cliente (
    CodCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(20) NOT NULL,
    FOREIGN KEY (CodCliente) REFERENCES desafio_xp.pessoa_cliente (CodCliente)
) ENGINE=INNODB;

CREATE TABLE ordens (
    CodCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    CodAtivo INT NOT NULL,
    QtdeAtivo INT NOT NULL,
    FOREIGN KEY (CodCliente) REFERENCES desafio_xp.pessoa_cliente (CodCliente)
) ENGINE=INNODB;

CREATE TABLE ativos (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    CodAtivo VARCHAR(50) NOT NULL,
    QtdeAtivo INT NOT NULL,
    Valor DOUBLE
) ENGINE=INNODB;

INSERT INTO
  desafio_xp.pessoa_cliente (CodCliente, Saldo)
VALUES
  (1, 1000.00);
  
INSERT INTO
  desafio_xp.ordens (CodCliente, CodAtivo, QtdeAtivo)
VALUES
  (1, 1, 100);
