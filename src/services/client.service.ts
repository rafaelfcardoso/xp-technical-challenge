import { ClienteRepository } from "../repositories/ClienteRepository";
import IClient from "../interfaces/client.interface";
import ILogin from "../interfaces/login.interface";

const clienteRepository = new ClienteRepository();

const getByCodeClient = async (codClient: number): Promise<IClient> => {
  const client = await clienteRepository.findByCode(codClient);
  
  if (!client) {
    throw new Error('Client not found');
  }

  return {
    codCliente: client.codCliente,
    saldo: client.saldo
  };
};

const getAllLogin = async (): Promise<ILogin[]> => {
  const clients = await clienteRepository.findAll();
  return clients.map(client => ({
    codCliente: client.codCliente,
    username: client.username,
    password: client.password
  }));
};

const getByUsername = async (username: string): Promise<ILogin[]> => {
  const users = await clienteRepository.findByUsername(username);
  return users.map(user => ({
    codCliente: user.codCliente,
    username: user.username,
    password: user.password
  }));
};

export default {
  getByCodeClient,
  getAllLogin,
  getByUsername,
};