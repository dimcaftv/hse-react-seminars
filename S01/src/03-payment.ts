// Задание 3. Платежи (20 минут)
//
// 1. Реализуйте describePayment: switch по метке kind.
// 2. Закройте switch проверкой полноты через never.
// 3. Реализуйте total — сумма только наличных платежей.
// 4. Добавьте четвёртый вариант оплаты и посмотрите, где компилятор
//    покажет незакрытые места.

import {assertNever} from "./01-status";

export type Payment =
    | { kind: "card"; last4: string }
    | { kind: "cash"; amount: number }
    | { kind: "transfer"; iban: string }
    | { kind: "crypta"; name: string };

export function describePayment(payment: Payment): string {
    switch (payment.kind) {
        case "card":
            return `Card: ****-${payment.last4}`;
        case "cash":
            return `Cash: ${payment.amount}$`;
        case "transfer":
            return `Transfer: ${payment.iban}`;
        case "crypta":
            return `Crypta: ${payment.name}`;
        default:
            return assertNever(payment)
    }

}

export function total(payments: Payment[]): number {
    let res = 0;
    for (const payment of payments) {
        if (payment.kind === 'cash')
            res += payment.amount;
    }
    return res;
}
