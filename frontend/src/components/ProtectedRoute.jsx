import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

export default function ProtectedRoute({ children, requireRole = null }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0f0f0f'
      }}>
        <div>
          <div className="spinner" style={{ width: 32, height: 32, margin: '0 auto 12px' }} />
          <p style={{ color: '#6b7280', fontSize: 14 }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role if specified
  if (requireRole && user?.role !== requireRole) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0f0f0f',
        padding: 20,
      }}>
        <div style={{
          textAlign: 'center',
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: 16,
          padding: 40,
          maxWidth: 400,
        }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f5f5f5', marginBottom: 12 }}>Access Denied</h1>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>
            You don't have permission to access this page. Required role: {requireRole}
          </p>
          <button
            onClick={() => window.history.back()}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            className="btn-lift"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
}
