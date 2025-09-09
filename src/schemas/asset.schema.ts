import { Type, Static } from '@sinclair/typebox';

// Asset schemas
export const AssetParamsSchema = Type.Object({
  id: Type.String({ pattern: '^[0-9]+$' })
});

export const AssetResponseSchema = Type.Object({
  codAtivo: Type.Integer(),
  qtdeAtivo: Type.Integer(),
  valor: Type.Number()
});

export const ClientAssetResponseSchema = Type.Array(
  Type.Object({
    codCliente: Type.Integer(),
    codAtivo: Type.Integer(),
    qtdeAtivo: Type.Integer(),
    valor: Type.Number()
  })
);

export const AssetUpdateBodySchema = Type.Object({
  qtdeAtivo: Type.Integer({ minimum: 1 })
});

// Static types
export type AssetParams = Static<typeof AssetParamsSchema>;
export type AssetResponse = Static<typeof AssetResponseSchema>;
export type ClientAssetResponse = Static<typeof ClientAssetResponseSchema>;
export type AssetUpdateBody = Static<typeof AssetUpdateBodySchema>;