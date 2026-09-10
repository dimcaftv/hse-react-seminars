// Задание 2. Карточка пользователя (15 минут)
//
// 1. Реализуйте describeUser.
// 2. Отсутствующий возраст не должен превращаться в "undefined лет".
// 3. Контакт различайте оператором in, а не проверкой на undefined.
// 4. Пустой массив хобби обработайте отдельной фразой.
//
// Без any, as и !.

export type Contact = { email: string } | { phone: string };

export type User = {
    name: string;
    age?: number;
    hobbies: string[];
    contact: Contact;
};

export function describeUser(user: User): string {
    let res: string[] = [];
    res.push(`Name: ${user.name}`);
    if (user.age)
        res.push(`Age: ${user.age}`);
    if ('email' in user.contact)
        res.push(`Email: ${user.contact.email}`);
    if ('phone' in user.contact)
        res.push(`Phone: ${user.contact.phone}`);
    if (user.hobbies.length)
        res.push(`Hobbies: ${user.hobbies}`);
    else
        res.push(`Hobbies: NONE`);

    return res.join('\n');
}
