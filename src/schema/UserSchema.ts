import { Type } from '@sinclair/typebox';

export default class UserSchema {
    login = {
        body: Type.Object({
            email: Type.String({
                minLength: 0,
                maxLength: 100
            }),
            password: Type.String({
                minLength: 0,
                maxLength: 100
            })
        })
    };

    register = {
        body: Type.Object({
            address: Type.Object({
                street: Type.String({minLength: 0, maxLength: 150}),
                neighborhood: Type.String({minLength: 0, maxLength: 100}),
                number: Type.String({minLength: 0, maxLength: 10}),
                state: Type.String({minLength: 0, maxLength: 2}),
                zipCode: Type.String({minLength: 0, maxLength: 8})
            }),
            email: Type.String({minLength: 0, maxLength: 100}),
            password: Type.String({minLength: 0, maxLength: 100}),
            birthDate: Type.String({minLength: 1, maxLength: 50}),
            cpf: Type.String({minLength: 0, maxLength: 11}),
            name: Type.String({minLength: 0, maxLength: 100}),
        })
    }
}