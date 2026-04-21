import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="1"
            style={{ margin: '0 auto 2rem' }}
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: '0 0 1rem 0'
          }}>
            Your cart is empty
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#666',
            marginBottom: '2rem'
          }}>
            Start shopping to add items to your cart
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              background: '#667eea',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#5568d3'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#667eea'}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      background: '#f9fafb',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1a1a1a',
          margin: '0 0 2rem 0'
        }}>
          Shopping Cart
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map(item => (
              <div
                key={item.product.id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }}
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    margin: '0 0 0.5rem 0'
                  }}>
                    {item.product.name}
                  </h3>

                  <p style={{
                    fontSize: '0.875rem',
                    color: '#666',
                    margin: '0 0 1rem 0',
                    lineHeight: '1.5'
                  }}>
                    {item.product.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginTop: 'auto'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#f3f4f6',
                      borderRadius: '8px',
                      padding: '0.25rem'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{
                          background: 'white',
                          border: 'none',
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: '#374151',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                      >
                        -
                      </button>
                      <span style={{
                        minWidth: '32px',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: '1rem'
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        style={{
                          background: 'white',
                          border: 'none',
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          cursor: item.quantity >= item.product.stock ? 'not-allowed' : 'pointer',
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: '#374151',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background 0.2s ease',
                          opacity: item.quantity >= item.product.stock ? 0.5 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (item.quantity < item.product.stock) {
                            e.currentTarget.style.background = '#e5e7eb';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (item.quantity < item.product.stock) {
                            e.currentTarget.style.background = 'white';
                          }
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        padding: '0.5rem',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#ef4444'}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1a1a1a'
                }}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            position: 'sticky',
            top: '100px'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1a1a1a',
              margin: '0 0 1.5rem 0'
            }}>
              Order Summary
            </h2>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              fontSize: '1rem',
              color: '#666'
            }}>
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              fontSize: '1rem',
              color: '#666'
            }}>
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div style={{
              borderTop: '2px solid #e5e7eb',
              paddingTop: '1rem',
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1a1a1a'
              }}>
                Total
              </span>
              <span style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#667eea'
              }}>
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              style={{
                display: 'block',
                background: '#667eea',
                color: 'white',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1rem',
                marginTop: '1.5rem',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#5568d3'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#667eea'}
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/"
              style={{
                display: 'block',
                color: '#667eea',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.875rem',
                marginTop: '1rem',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#5568d3'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#667eea'}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
