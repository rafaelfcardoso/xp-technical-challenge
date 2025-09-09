import { AccountRepository } from "../repositories/AccountRepository";
import ITransaction from "../interfaces/transaction.interface";
import HttpException from "../shared/http.exception";
import { StatusCodes } from "http-status-codes";

const accountRepository = new AccountRepository();

const isValidField = (order: ITransaction) => {
  if (!order.codCliente || typeof order.codCliente !== "number") return false;
  if (!order.valor || typeof order.valor !== "number") return false;

  return true;
};

const isValid = (order: ITransaction) => {
  if (order.valor <= 0) return false;

  return true;
};

const createDeposit = async (deposit: ITransaction): Promise<ITransaction> => {
  if (!isValidField(deposit)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Dados inválidos!");
  }

  if (!isValid(deposit)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Quantidade a ser depositada não poderá ser negativa ou igual a zero.");
  }

  const createdDeposit = await accountRepository.createDeposit({
    codCliente: deposit.codCliente,
    valor: deposit.valor
  });

  return {
    ...deposit,
    id: createdDeposit.id
  };
};

const createWithdraw = async (withdraw: ITransaction): Promise<ITransaction> => {
  if (!isValidField(withdraw)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Dados inválidos!");
  }

  if (!isValid(withdraw)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Quantidade a ser sacada não poderá ser negativa ou igual a zero.");
  }

  const createdWithdraw = await accountRepository.createWithdrawal({
    codCliente: withdraw.codCliente,
    valor: withdraw.valor
  });

  return {
    ...withdraw,
    id: createdWithdraw.id
  };
};

export default {
  createDeposit,
  createWithdraw,
};