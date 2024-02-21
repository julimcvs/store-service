import { Type } from '@sinclair/typebox';

export default class PurchaseSchema {
    checkout = {
        body: Type.Object({
            quotationId: Type.String()
        })
    };
}