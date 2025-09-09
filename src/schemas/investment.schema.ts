import { Type, Static } from '@sinclair/typebox';

// Investment schemas
export const InvestmentOrderBodySchema = Type.Object({
  codCliente: Type.Integer({ minimum: 1 }),
  codAtivo: Type.Integer({ minimum: 1 }),
  qtdeAtivo: Type.Integer({ minimum: 1 })
});

export const InvestmentOrderResponseSchema = Type.Object({
  codCliente: Type.Integer(),
  codAtivo: Type.Integer(),
  qtdeAtivo: Type.Integer(),
  id: Type.Optional(Type.Integer())
});

export const ErrorResponseSchema = Type.Object({
  message: Type.String()
});

// Static types
export type InvestmentOrderBody = Static<typeof InvestmentOrderBodySchema>;
export type InvestmentOrderResponse = Static<typeof InvestmentOrderResponseSchema>;
export type ErrorResponse = Static<typeof ErrorResponseSchema>;