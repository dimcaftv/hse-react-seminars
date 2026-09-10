// Задание 1. Статусы (15 минут)
//
// 1. Опишите Status как объединение литералов.
// 2. Реализуйте statusMessage через switch — по одному сообщению на вариант.
// 3. Закройте switch функцией assertNever, чтобы забытый вариант
//    становился ошибкой компиляции.
// 4. Добавьте в Status вариант "cancelled" и почините то, что сломается.

export type Status = "idle" | "loading" | "success" | "error" | "cancelled";

export function assertNever(value: never): never {
    throw new Error("Необработанный вариант: " + JSON.stringify(value));
}

export function statusMessage(status: Status): string {
    switch (status) {
        case "idle":
            return "ожидание";
        case "loading":
            return "загрузка";
        case "success":
            return "успех";
        case "error":
            return "провал";
        case "cancelled":
            return "отмена";
        default:
            return assertNever(status);
    }
}
