import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching product:', error);
    } else if (data) {
      setProduct(data);
      fetchRelatedProducts(data.category);
    }
    setLoading(false);
  };

  const fetchRelatedProducts = async (category: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .neq('id', id)
      .limit(3);

    if (error) {
      console.error('Error fetching related products:', error);
    } else if (data) {
      setRelatedProducts(data);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9fafb'
      }}>
        <div style={{
          fontSize: '1.25rem',
          color: '#667eea',
          fontWeight: '600'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: '0 0 1rem 0'
          }}>
            Product not found
          </h2>
          <Link
            to="/"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div style={{ background: '#f9fafb', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#667eea',
            textDecoration: 'none',
            fontWeight: '600',
            marginBottom: '2rem',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#5568d3'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#667eea'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Products
        </Link>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '3rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start'
          }}>
            <div>
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '12px'
                }}
              />
            </div>

            <div>
              <div style={{
                fontSize: '0.875rem',
                color: '#667eea',
                fontWeight: '600',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {product.category}
              </div>

              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#1a1a1a',
                margin: '0 0 1rem 0',
                lineHeight: '1.2'
              }}>
                {product.name}
              </h1>

              <div style={{
                fontSize: '3rem',
                fontWeight: '800',
                color: '#667eea',
                margin: '0 0 2rem 0'
              }}>
                ${product.price.toFixed(2)}
              </div>

              <p style={{
                fontSize: '1.125rem',
                color: '#666',
                lineHeight: '1.8',
                marginBottom: '2rem'
              }}>
                {product.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem',
                background: '#f9fafb',
                borderRadius: '8px',
                marginBottom: '2rem'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#666',
                    marginBottom: '0.25rem'
                  }}>
                    Availability
                  </div>
                  <div style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: product.stock > 0 ? '#10b981' : '#ef4444'
                  }}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  style={{
                    flex: 1,
                    background: product.stock === 0 ? '#ccc' : (isAdded ? '#10b981' : '#667eea'),
                    color: 'white',
                    border: 'none',
                    padding: '1.25rem 2rem',
                    borderRadius: '8px',
                    fontSize: '1.125rem',
                    fontWeight: '700',
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
                  {product.stock === 0 ? 'Out of Stock' : (isAdded ? 'Added to Cart!' : 'Add to Cart')}
                </button>

                <button
                  onClick={() => {
                    if (product.stock > 0) {
                      addToCart(product);
                      navigate('/cart');
                    }
                  }}
                  disabled={product.stock === 0}
                  style={{
                    background: product.stock === 0 ? '#e5e7eb' : 'white',
                    color: product.stock === 0 ? '#9ca3af' : '#667eea',
                    border: '2px solid',
                    borderColor: product.stock === 0 ? '#e5e7eb' : '#667eea',
                    padding: '1.25rem 2rem',
                    borderRadius: '8px',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (product.stock > 0) {
                      e.currentTarget.style.background = '#667eea';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (product.stock > 0) {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#667eea';
                    }
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: '#1a1a1a',
              margin: '0 0 2rem 0'
            }}>
              Related Products
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem'
            }}>
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <img
                    src={relatedProduct.image_url}
                    alt={relatedProduct.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1a1a1a',
                      margin: '0 0 0.5rem 0'
                    }}>
                      {relatedProduct.name}
                    </h3>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#667eea'
                    }}>
                      ${relatedProduct.price.toFixed(2)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
