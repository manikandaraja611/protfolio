import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{
          width: '100%',
          height: '240px',
          overflow: 'hidden',
          background: '#f5f5f5'
        }}>
          <img
            src={product.image_url}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
      </Link>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{
          fontSize: '0.875rem',
          color: '#667eea',
          fontWeight: '600',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {product.category}
        </div>

        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            margin: '0 0 0.5rem 0',
            color: '#1a1a1a',
            lineHeight: '1.4'
          }}>
            {product.name}
          </h3>
        </Link>

        <p style={{
          fontSize: '0.875rem',
          color: '#666',
          margin: '0 0 1rem 0',
          lineHeight: '1.5',
          flexGrow: 1
        }}>
          {product.description}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1a1a1a'
          }}>
            ${product.price.toFixed(2)}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              background: product.stock === 0 ? '#ccc' : (isAdded ? '#10b981' : '#667eea'),
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (product.stock > 0 && !isAdded) {
                e.currentTarget.style.background = '#5568d3';
              }
            }}
            onMouseLeave={(e) => {
              if (product.stock > 0 && !isAdded) {
                e.currentTarget.style.background = '#667eea';
              }
            }}
          >
            {product.stock === 0 ? 'Out of Stock' : (isAdded ? 'Added!' : 'Add to Cart')}
          </button>
        </div>

        {product.stock > 0 && product.stock <= 10 && (
          <div style={{
            marginTop: '0.75rem',
            fontSize: '0.75rem',
            color: '#ef4444',
            fontWeight: '500'
          }}>
            Only {product.stock} left in stock
          </div>
        )}
      </div>
    </div>
  );
}
