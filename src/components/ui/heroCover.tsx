export default function HeroCover() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1500px',
        margin: '0 auto',
        borderRadius: '22px',
        overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(61, 43, 31, 0.24)',
        border: '1px solid rgba(255,255,255,0.45)',
        background: 'linear-gradient(135deg, #C4A4A8 0%, #B8929A 30%, #A67C85 60%, #8B6B73 100%)',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(20px, 4vw, 60px)',
          padding: 'clamp(30px, 6vw, 80px) clamp(20px, 4vw, 60px)',
          minHeight: 'clamp(150px, 25vw, 300px)',
        }}
      >
        {/* MARIPOSA del favicon */}
        <img
          src="/images/MG-Favicon.png"
          alt=""
          aria-hidden="true"
          style={{
            width: 'clamp(60px, 12vw, 140px)',
            height: 'auto',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
            flexShrink: 0,
          }}
        />

        {/* Separador curvo */}
        <div
          style={{
            width: '2px',
            height: 'clamp(60px, 10vw, 120px)',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 80%, transparent 100%)',
            borderRadius: '1px',
            flexShrink: 0,
          }}
        />

        {/* Texto */}
        <div style={{ textAlign: 'left' }}>
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(16px, 3vw, 32px)',
              fontWeight: 400,
              color: 'white',
              margin: 0,
              lineHeight: 1.3,
              letterSpacing: '1px',
              fontFamily: "'Playfair Display', 'Georgia', serif",
              textShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            Maria Sol Goldenberg
          </p>
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(12px, 2vw, 20px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.9)',
              margin: 'clamp(4px, 1vw, 8px) 0 0 0',
              lineHeight: 1.3,
              letterSpacing: '2px',
              fontFamily: "'Inter', sans-serif",
              textTransform: 'uppercase',
            }}
          >
            Licenciada en Marketing
          </p>
        </div>
      </div>
    </div>
  );
}