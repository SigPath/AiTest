import { AbsoluteFill, useCurrentFrame, interpolate, Sequence, spring, useVideoConfig } from 'remotion';

/**
 * EKSTREMALNIE SPEKTAKULARNA REKLAMA RETAIL MEDIA
 */

const Particle = ({ index, startFrame, totalParticles }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const angle = (index / totalParticles) * Math.PI * 2;
  const delay = startFrame + (index * 2);
  
  const particleSpring = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { stiffness: 100, damping: 20 }
  });
  
  const distance = interpolate(particleSpring, [0, 1], [0, 150]);
  const opacity = interpolate(
    frame,
    [delay, delay + 20, delay + 40],
    [0, 1, 0],
    { extrapolateRight: 'clamp' }
  );
  
  const rotation = interpolate(
    frame,
    [delay, delay + 60],
    [0, 720],
    { extrapolateRight: 'clamp' }
  );
  
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  
  return (
    <div
      style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: `linear-gradient(135deg, #FFD700, #FFA500)`,
        opacity: opacity,
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${particleSpring})`,
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
      }}
    />
  );
};

const SuperGlowEffect = ({ startFrame = 30 }) => {
  const frame = useCurrentFrame();
  
  const rotation1 = interpolate(frame, [startFrame, startFrame + 90], [0, 360], { extrapolateRight: 'extend' });
  const rotation2 = interpolate(frame, [startFrame, startFrame + 90], [360, 0], { extrapolateRight: 'extend' });
  const rotation3 = interpolate(frame, [startFrame, startFrame + 90], [0, 180], { extrapolateRight: 'extend' });
  
  const pulse = interpolate(
    frame,
    [startFrame, startFrame + 15, startFrame + 30, startFrame + 45, startFrame + 60, startFrame + 75, startFrame + 90],
    [0.3, 0.8, 0.4, 0.9, 0.5, 0.8, 0.6],
    { extrapolateRight: 'clamp' }
  );

  return (
    <>
      <div style={{ position: 'absolute', width: '500px', height: '150px', background: 'radial-gradient(ellipse, rgba(255, 215, 0, 0.9) 0%, transparent 70%)', filter: 'blur(50px)', opacity: pulse, transform: `rotate(${rotation1}deg) scale(${1 + pulse * 0.3})`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '450px', height: '130px', background: 'radial-gradient(ellipse, rgba(255, 165, 0, 0.7) 0%, transparent 70%)', filter: 'blur(40px)', opacity: pulse * 0.8, transform: `rotate(${rotation2}deg) scale(${1.1 + pulse * 0.2})`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '300px', height: '100px', background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.6) 0%, transparent 70%)', filter: 'blur(30px)', opacity: pulse * 0.9, transform: `rotate(${rotation3}deg) scale(${0.8 + pulse * 0.4})`, pointerEvents: 'none' }} />
    </>
  );
};

const EnergyRing = ({ delay, color, maxScale = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const ringSpring = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { stiffness: 50, damping: 20 }
  });
  
  const scale = interpolate(ringSpring, [0, 1], [0.5, maxScale]);
  const opacity = interpolate(ringSpring, [0, 0.3, 1], [0, 0.8, 0]);
  
  return (
    <div
      style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        border: `4px solid ${color}`,
        borderRadius: '50%',
        opacity: opacity,
        transform: `scale(${scale})`,
        boxShadow: `0 0 40px ${color}, inset 0 0 40px ${color}`,
        pointerEvents: 'none',
      }}
    />
  );
};

const ProductSlide = ({ brand, productName, price, description }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const backgroundShift = interpolate(frame, [0, 45, 90], [0, 25, -15], { extrapolateRight: 'clamp' });
  const backgroundLightness = interpolate(frame, [0, 30, 60, 90], [12, 25, 18, 28], { extrapolateRight: 'clamp' });
  const backgroundSaturation = interpolate(frame, [0, 45, 90], [40, 65, 50], { extrapolateRight: 'clamp' });
  
  const dynamicBackground = `hsl(${155 + backgroundShift}, ${backgroundSaturation}%, ${backgroundLightness}%)`;

  const vignettePulse = interpolate(frame, [0, 15, 30, 45, 60, 75, 90], [0.4, 0.6, 0.3, 0.7, 0.4, 0.6, 0.5], { extrapolateRight: 'clamp' });

  const logoSpring = spring({ frame: frame, fps, from: -200, to: 0, config: { stiffness: 300, damping: 8 } });
  const logoShake = interpolate(frame, [5, 8, 11, 14], [0, -5, 3, 0], { extrapolateRight: 'clamp' });
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const logoPulse = interpolate(frame, [15, 22, 30, 37, 45, 52, 60, 67, 75, 82, 90], [1.0, 1.12, 1.0, 1.15, 1.0, 1.12, 1.0, 1.15, 1.0, 1.12, 1.05], { extrapolateRight: 'clamp' });

  const productSpring = spring({ frame: frame - 15, fps, from: 0, to: 1, config: { stiffness: 300, damping: 7 } });
  const productScale = interpolate(productSpring, [0, 1], [0.2, 1], { extrapolateRight: 'clamp' });
  const productOpacity = interpolate(frame, [15, 25], [0, 1], { extrapolateRight: 'clamp' });
  const productRotate = interpolate(frame, [15, 30], [-15, 0], { extrapolateRight: 'clamp' });
  const productShake = Math.sin((frame - 30) * 0.3) * 2;

  const priceExplosion = spring({ frame: frame - 30, fps, from: 0, to: 1, config: { stiffness: 400, damping: 6 } });
  const priceScale = interpolate(priceExplosion, [0, 1], [0.1, 1], { extrapolateRight: 'clamp' });
  const priceOpacity = interpolate(frame, [30, 38], [0, 1], { extrapolateRight: 'clamp' });
  const priceVibration = frame > 40 ? Math.sin((frame - 40) * 0.5) * 1.5 : 0;
  const priceGigaPulse = interpolate(frame, [40, 50, 60, 70, 80, 90], [1.0, 1.08, 1.0, 1.10, 1.0, 1.06], { extrapolateRight: 'clamp' });

  const descriptionOpacity = interpolate(frame, [45, 58], [0, 1], { extrapolateRight: 'clamp' });
  const descriptionSlideUp = interpolate(frame, [45, 58], [50, 0], { extrapolateRight: 'clamp' });
  const descriptionScale = interpolate(frame, [45, 58], [0.8, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: dynamicBackground, fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, ${vignettePulse}))`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute' }}>
        <EnergyRing delay={30} color="rgba(255, 215, 0, 0.6)" maxScale={4} />
        <EnergyRing delay={35} color="rgba(255, 165, 0, 0.5)" maxScale={4.5} />
        <EnergyRing delay={40} color="rgba(255, 255, 255, 0.4)" maxScale={5} />
      </div>
      <div style={{ fontSize: '52px', fontWeight: '200', letterSpacing: '12px', color: '#FFFFFF', textTransform: 'uppercase', opacity: logoOpacity, transform: `translateY(${logoSpring}px) translateX(${logoShake}px) scale(${logoPulse})`, marginBottom: '40px', textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5), 0 4px 30px rgba(0, 0, 0, 0.5)', filter: frame > 10 ? `drop-shadow(0 0 ${logoPulse * 15}px rgba(255, 255, 255, 0.6))` : 'none' }}>{brand}</div>
      <div style={{ fontSize: '110px', fontWeight: '900', color: '#FFFFFF', textAlign: 'center', lineHeight: '1.0', maxWidth: '1300px', opacity: productOpacity, transform: `scale(${productScale}) rotate(${productRotate}deg) translateX(${productShake}px)`, marginBottom: '60px', textShadow: '0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.5), 0 8px 40px rgba(0, 0, 0, 0.6), 0 0 100px rgba(255, 255, 255, 0.3)', letterSpacing: '-3px', filter: frame > 25 ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))' : 'none', WebkitTextStroke: '2px rgba(255, 215, 0, 0.3)' }}>{productName}</div>
      <div style={{ position: 'relative', marginBottom: '70px' }}>
        <SuperGlowEffect startFrame={30} />
        {frame > 30 && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{[...Array(12)].map((_, i) => <Particle key={i} index={i} startFrame={32} totalParticles={12} />)}</div>}
        <div style={{ fontSize: '220px', fontWeight: '900', color: '#FFD700', opacity: priceOpacity, transform: `scale(${priceScale * priceGigaPulse}) rotate(${priceVibration}deg)`, textShadow: '0 0 40px rgba(255, 215, 0, 1), 0 0 80px rgba(255, 215, 0, 0.8), 0 0 120px rgba(255, 165, 0, 0.6), 0 0 160px rgba(255, 255, 255, 0.4), 0 12px 60px rgba(0, 0, 0, 0.8)', letterSpacing: '-6px', position: 'relative', zIndex: 2, WebkitTextStroke: '3px rgba(255, 140, 0, 0.5)', filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 60px rgba(255, 165, 0, 0.6))' }}>{price}</div>
      </div>
      <div style={{ fontSize: '44px', fontWeight: '500', color: '#FFFFFF', opacity: descriptionOpacity, textAlign: 'center', fontStyle: 'italic', maxWidth: '1000px', transform: `translateY(${descriptionSlideUp}px) scale(${descriptionScale})`, textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 4px 25px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 255, 255, 0.3)', lineHeight: '1.4', letterSpacing: '1px', filter: frame > 55 ? 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.5))' : 'none' }}>{description}</div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '400px', background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent)', pointerEvents: 'none' }} />
      {frame > 30 && <><div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle at top right, rgba(255, 215, 0, 0.2), transparent)', opacity: interpolate(frame, [30, 45, 60], [0, 0.8, 0.4], { extrapolateRight: 'clamp' }), pointerEvents: 'none' }} /><div style={{ position: 'absolute', bottom: 0, left: 0, width: '300px', height: '300px', background: 'radial-gradient(circle at bottom left, rgba(255, 165, 0, 0.2), transparent)', opacity: interpolate(frame, [35, 50, 65], [0, 0.8, 0.4], { extrapolateRight: 'clamp' }), pointerEvents: 'none' }} /></>}
    </AbsoluteFill>
  );
};

export const RetailAd = ({ data }) => {
  const products = data.products || [data];
  const slideDuration = 90;
  return (<>{products.map((product, index) => (<Sequence key={index} from={index * slideDuration} durationInFrames={slideDuration}><ProductSlide brand={product.brand} productName={product.product} price={product.price} description={product.promoText} /></Sequence>))}</>);
};
