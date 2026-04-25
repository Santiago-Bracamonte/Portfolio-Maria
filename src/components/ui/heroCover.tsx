export default function HeroCover() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Washi tape superior */}
      <div
        className="washi-tape washi-tape-pink"
        style={{
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-3deg)',
          zIndex: 10,
        }}
      />

      {/* Polaroid principal */}
      <div
        className="polaroid"
        style={{
          '--rotation': '-2deg',
          background: 'var(--polaroid)',
          padding: 'clamp(12px, 2vw, 24px)',
          paddingBottom: 'clamp(32px, 5vw, 64px)',
          boxShadow: '0 8px 32px rgba(61, 43, 31, 0.2), 0 2px 8px rgba(61, 43, 31, 0.15)',
          borderRadius: '4px',
          position: 'relative',
        } as React.CSSProperties}
      >
        {/* Contenido del polaroid */}
        <div
          style={{
            background: 'linear-gradient(135deg, #C4A4A8 0%, #B8929A 30%, #A67C85 60%, #8B6B73 100%)',
            borderRadius: '2px',
            padding: 'clamp(30px, 6vw, 60px) clamp(20px, 4vw, 40px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(16px, 3vw, 40px)',
            minHeight: 'clamp(120px, 20vw, 200px)',
          }}
        >
          <img
            src="/MG-Favicon.png"
            alt=""
            aria-hidden="true"
            style={{
              width: 'clamp(50px, 10vw, 100px)',
              height: 'auto',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
              flexShrink: 0,
            }}
          />
          {/* Mariposa */}

          {/* Separador */}
          <div
            style={{
              width: '1px',
              height: 'clamp(50px, 8vw, 100px)',
              background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.5) 80%, transparent 100%)',
            }}
          />

          {/* Texto */}
          <div style={{ textAlign: 'left' }}>
            <p
              style={{
                fontSize: 'clamp(14px, 2.5vw, 24px)',
                fontWeight: 400,
                color: 'white',
                margin: 0,
                lineHeight: 1.3,
                letterSpacing: '1px',
                fontFamily: "'Playfair Display', 'Georgia', serif",
                textShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              Maria Sol Goldenberg
            </p>
            <p
              style={{
                fontSize: 'clamp(10px, 1.5vw, 16px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.9)',
                margin: '6px 0 0 0',
                lineHeight: 1.3,
                letterSpacing: '3px',
                fontFamily: "'Inter', sans-serif",
                textTransform: 'uppercase',
              }}
            >
              Licenciada en Marketing
            </p>
          </div>
        </div>

        {/* Espacio polaroid inferior (blanco) */}
      </div>

      {/* Washi tape inferior decorativa */}
      <div
        className="washi-tape washi-tape-blue"
        style={{
          bottom: '20px',
          right: '-10px',
          transform: 'rotate(12deg)',
          zIndex: 10,
        }}
      />
    </div>
  );
}