
import React, { useState } from 'react';
import './index.css';

const foods = [
  { id: 1, name: 'Zinger Burger', category: 'Fast Food', price: 450, emoji: '🍔', description: 'Crispy chicken, cheese and special sauce' },
  { id: 2, name: 'Chicken Pizza', category: 'Fast Food', price: 650, emoji: '🍕', description: 'Cheesy pizza with delicious chicken' },
  { id: 3, name: 'Club Sandwich', category: 'Snacks', price: 350, emoji: '🥪', description: 'Fresh sandwich with chicken and vegetables' },
  { id: 4, name: 'French Fries', category: 'Snacks', price: 200, emoji: '🍟', description: 'Golden crispy salted fries' },
  { id: 5, name: 'Chicken Biryani', category: 'Meals', price: 300, emoji: '🍛', description: 'Spicy rice served with chicken' },
  { id: 6, name: 'Chicken Roll', category: 'Meals', price: 250, emoji: '🌯', description: 'Chicken roll with fresh chutney' },
  { id: 7, name: 'Cold Coffee', category: 'Drinks', price: 220, emoji: '🥤', description: 'Chilled creamy coffee' },
  { id: 8, name: 'Fresh Juice', category: 'Drinks', price: 180, emoji: '🧃', description: 'Refreshing seasonal fruit juice' },
];

const categories = ['All', 'Fast Food', 'Snacks', 'Meals', 'Drinks'];

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [message, setMessage] = useState('');

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || food.category === category;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (food) => {
    setCart((previousCart) => {
      const existing = previousCart.find((item) => item.id === food.id);

      if (existing) {
        return previousCart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...food, quantity: 1 }];
    });

    setMessage(`${food.name} added to cart!`);
    setTimeout(() => setMessage(''), 2000);
  };

  const changeQuantity = (id, amount) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = () => {
    if (cart.length === 0) {
      setMessage('Your cart is empty!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const order = cart
      .map((item) => `${item.name} x ${item.quantity}`)
      .join(', ');

    alert(
      `Order Summary\n\n${order}\n\nTotal: Rs. ${totalPrice}\n\nDemo checkout only. No payment or order has been submitted.`
    );
  };

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="logo">
          <span>🍽️</span> Campus Canteen
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <button
            className="cart-button"
            onClick={() => setShowCart(!showCart)}
          >
            🛒 Cart ({totalItems})
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="tag">YOUR CAMPUS, YOUR FOOD</span>
            <h1>
              Good Food.
              <br />
              <span>Good Mood.</span>
            </h1>
            <p>
              Your favorite campus meals, snacks and drinks
              all in one place.
            </p>
            <a href="#menu" className="primary-button">
              Explore Menu →
            </a>
          </div>

          <div className="hero-emoji">🍔</div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="tag">FRESH & DELICIOUS</span>
              <h2>Our Menu</h2>
              <p>Find something delicious for your next break.</p>
            </div>

            <div className="search-box">
              <span>🔎</span>
              <input
                type="text"
                placeholder="Search food..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-button ${
                  category === item ? 'active' : ''
                }`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {showCart && (
            <section className="cart-panel">
              <div className="cart-heading">
                <h3>Your Shopping Cart</h3>
                <button onClick={() => setShowCart(false)}>✕</button>
              </div>

              {cart.length === 0 ? (
                <p>Your cart is empty. Add something from the menu!</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <span>{item.emoji} {item.name}</span>

                      <div className="quantity-controls">
                        <button onClick={() => changeQuantity(item.id, -1)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => changeQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>

                      <strong>Rs. {item.price * item.quantity}</strong>
                    </div>
                  ))}

                  <div className="cart-total">
                    <strong>Total</strong>
                    <strong>Rs. {totalPrice}</strong>
                  </div>

                  <button className="checkout-button" onClick={checkout}>
                    Checkout — Rs. {totalPrice}
                  </button>
                </>
              )}
            </section>
          )}

          {message && <div className="toast">{message}</div>}

          <div className="food-grid">
            {filteredFoods.map((food) => (
              <article className="food-card" key={food.id}>
                <div className="food-image">
                  <span className="food-emoji">{food.emoji}</span>
                  <span className="food-category">{food.category}</span>
                </div>

                <div className="food-details">
                  <h3>{food.name}</h3>
                  <p>{food.description}</p>

                  <div className="food-footer">
                    <strong>Rs. {food.price}</strong>
                    <button
                      className="add-button"
                      onClick={() => addToCart(food)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <p className="empty-message">
              No food found. Try another search or category.
            </p>
          )}
        </section>
      </main>

      <footer>
        <h3>🍽️ Campus Canteen</h3>
        <p>Made for hungry students, one meal at a time.</p>
        <p>© 2026 Campus Canteen — Student Project</p>
      </footer>
    </div>
  );
}

export default App;
