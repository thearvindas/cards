export default function Footer() {
  return (
    <footer style={{ 
      padding: '2rem 1rem',
      textAlign: 'center'
    }}>
      <p style={{ 
        fontSize: '0.55rem', 
        lineHeight: '1.4', 
        margin: 0,
        color: '#666'
      }}>
        Built by <strong>Arvin</strong> with{' '}
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>
          Next.js
        </a>
        ,{' '}
        <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>
          TypeScript
        </a>
        ,{' '}
        <a href="https://nostalgic-css.github.io/NES.css/" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>
          NES.css
        </a>
        {' '}• crafted with{' '}
        <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>
          Cursor
        </a>
        {' '}• hosted on{' '}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>
          Vercel
        </a>
      </p>
    </footer>
  );
}

