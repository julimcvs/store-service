import { Type } from '@sinclair/typebox';

export default class QuotationSchema {
    addItem = {
        body: Type.Object({
            product: Type.Object({
                id: Type.Number(),
                quantity: Type.String(),
            }),
        })
    };

    quotation = {
        body: Type.Object({
            products: Type.Array(Type.Object({
                id: Type.Number(),
                quantity: Type.Number({minimum: 0, maximum: 9999}),
            }), {minItems: 1}),
            id: Type.Optional(Type.Number())
        })
    }
}