interface FooterProps {
  lang?: 'es' | 'en';
}

export default function Footer({ lang = 'es' }: FooterProps) {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'var(--cream)',
        padding: '48px 4vw 32px',
        borderTop: '2px solid var(--pastel-pink-soft)',
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
        }}
      >
        {/* Decorative element */}
        <div
          style={{
            width: '40px',
            height: '3px',
            backgroundColor: 'var(--pastel-pink)',
            borderRadius: '2px',
          }}
        />

        <p
          className="font-display"
          style={{
            fontSize: 'clamp(18px, 2vw, 24px)',
            fontWeight: 400,
            letterSpacing: '3px',
            color: 'var(--rose)',
            textTransform: 'uppercase',
          }}
        >
          Maru
        </p>

        <p
          className="font-body"
          style={{
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '2px',
            color: 'var(--mocha)',
            opacity: 0.6,
            textTransform: 'uppercase',
          }}
        >
          MARÍA SOL GOLDENBERG · 2026
        </p>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a
            href="https://www.instagram.com/marugoldenberg/"
            target="_blank"
            rel="noreferrer"
            className="font-body"
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '1.5px',
              color: 'var(--mocha)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1.5px solid var(--pastel-pink)',
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLAnchorElement;
              el.style.backgroundColor = 'var(--pastel-pink-soft)';
              el.style.color = 'var(--rose)';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLAnchorElement;
              el.style.backgroundColor = 'transparent';
              el.style.color = 'var(--mocha)';
              el.style.transform = 'translateY(0)';
            }}
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/maría-sol-goldenberg/"
            target="_blank"
            rel="noreferrer"
            className="font-body"
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '1.5px',
              color: 'var(--mocha)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1.5px solid var(--pastel-blue)',
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLAnchorElement;
              el.style.backgroundColor = 'var(--pastel-blue-soft)';
              el.style.color = 'var(--blue)';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLAnchorElement;
              el.style.backgroundColor = 'transparent';
              el.style.color = 'var(--mocha)';
              el.style.transform = 'translateY(0)';
            }}
          >
            LinkedIn
          </a>
        </div>

        <p
          className="font-body"
          style={{
            fontSize: '9px',
            letterSpacing: '1px',
            color: 'var(--warm-gray)',
            marginTop: '8px',
          }}
        >
          {lang === 'es' ? 'Hecho con 💗 ' : 'Made with 💗 '}
        </p>
      </div>
    </footer>
  );
}