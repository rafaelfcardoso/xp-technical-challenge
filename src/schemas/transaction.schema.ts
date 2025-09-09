import { Type, Static } from '@sinclair/typebox';

// Transaction schemas
export const TransactionBodySchema = Type.Object({
  codCliente: Type.Integer({ minimum: 1 }),
  valor: Type.Number({ minimum: 0.01 })
});

export const TransactionResponseSchema = Type.Object({
  id: Type.Integer(),
  codCliente: Type.Integer(),
  valor: Type.Number()
});

export const ClientParamsSchema = Type.Object({
  id: Type.String({ pattern: '^[0-9]+$' })
});

export const ClientResponseSchema = Type.Object({
  codCliente: Type.Integer(),
  saldo: Type.Number()
});

// Static types
export type TransactionBody = Static<typeof TransactionBodySchema>;
export type TransactionResponse = Static<typeof TransactionResponseSchema>;
export type ClientParams = Static<typeof ClientParamsSchema>;
export type ClientResponse = Static<typeof ClientResponseSchema>;