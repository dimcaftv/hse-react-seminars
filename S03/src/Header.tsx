export default function Header({itemCount, totalPrice, onClear}) {
    return (
        <header className="header">
            <h1>Магазин</h1>
            <div className="cart-summary">
                <p>
                    Корзина: {itemCount} шт. {totalPrice} ₽
                </p>
                <button className="button button-outline" type="button" onClick={onClear}>
                    Очистить
                </button>
            </div>
        </header>
    );
}