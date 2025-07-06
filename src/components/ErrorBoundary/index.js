import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, isHover: false, isActive: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { isHover, isActive } = this.state;
      const buttonStyle = {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: isActive
          ? 'var(--primary-color-light)'
          : isHover
          ? 'var(--primary-color-dark)'
          : 'var(--primary-color)',
        color: isActive ? 'var(--primary-color)' : '#fff',
        cursor: 'pointer',
        transform: isActive ? 'scale(0.98)' : 'none',
      };

      return (
        <div style={{
          padding: '4rem',
          textAlign: 'center',
          backgroundColor: 'var(--neutral-800)',
          borderRadius: '8px',
          border: '1px solid var(--neutral-700)',
          margin: '2rem',
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>😕 Something went wrong</h1>
          <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
            We couldn’t load this section. Please try again or reload the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            onMouseOver={() => this.setState({ isHover: true })}
            onMouseOut={() => this.setState({ isHover: false, isActive: false })}
            onMouseDown={() => this.setState({ isActive: true })}
            onMouseUp={() => this.setState({ isActive: false })}
            style={buttonStyle}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}