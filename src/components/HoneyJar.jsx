import { useCurrentFrame, interpolate, Easing } from 'remotion';

/**
 * HoneyJar Component
 * 
 * Renderuje słoik z animowanym miodem cieknącym po bokach
 */
export const HoneyJar = () => {
  const frame = useCurrentFrame();
  
  // Animacja cieknącego miodu - powtarza się co 60 klatek
  const dripProgress = interpolate(
    frame % 60,
    [0, 60],
    [0, 1],
    { extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0.0, 0.6, 1) }
  );
  
  // Wysokość cieknięcia
  const dripHeight = dripProgress * 200;
  
  // Opacity dla efektu pojawiania się
  const jarOpacity = interpolate(
    frame,
    [0, 30],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '400px',
        height: '500px',
        opacity: jarOpacity,
      }}
    >
      {/* Słoik */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '400px',
          left: '50px',
          top: '50px',
          backgroundColor: '#F4E4C1',
          borderRadius: '30px 30px 45px 45px',
          border: '8px solid #D4A574',
          boxShadow: 'inset 0 10px 50px rgba(218, 165, 32, 0.3), 0 20px 40px rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}
      >
        {/* Miód w środku słoika */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '85%',
            backgroundColor: '#DAA520',
            background: 'linear-gradient(180deg, #F0C862 0%, #DAA520 50%, #B8860B 100%)',
          }}
        />
        
        {/* Światło na słoiku */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '30px',
            width: '80px',
            height: '150px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50px',
            filter: 'blur(15px)',
          }}
        />
      </div>

      {/* Wieczko słoika */}
      <div
        style={{
          position: 'absolute',
          width: '280px',
          height: '50px',
          left: '60px',
          top: '30px',
          backgroundColor: '#8B4513',
          borderRadius: '20px 20px 5px 5px',
          border: '3px solid #654321',
          boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
        }}
      >
        {/* Tekstura wieczka */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '15px',
            top: '15px',
            background: 'repeating-linear-gradient(90deg, #654321 0px, #654321 2px, transparent 2px, transparent 6px)',
          }}
        />
      </div>

      {/* Cieknący miód - lewa strona */}
      <div
        style={{
          position: 'absolute',
          left: '55px',
          top: '450px',
          width: '40px',
          height: `${dripHeight}px`,
          backgroundColor: '#DAA520',
          background: 'linear-gradient(180deg, #F0C862 0%, #DAA520 100%)',
          borderRadius: '20px 20px 60% 60%',
          boxShadow: 'inset -5px 0 10px rgba(184, 134, 11, 0.5)',
          transition: 'height 0.1s ease-out',
        }}
      />

      {/* Cieknący miód - prawa strona */}
      <div
        style={{
          position: 'absolute',
          right: '55px',
          top: '450px',
          width: '35px',
          height: `${dripHeight * 0.8}px`,
          backgroundColor: '#DAA520',
          background: 'linear-gradient(180deg, #F0C862 0%, #DAA520 100%)',
          borderRadius: '20px 20px 55% 55%',
          boxShadow: 'inset -5px 0 10px rgba(184, 134, 11, 0.5)',
          transition: 'height 0.1s ease-out',
        }}
      />

      {/* Kropla miodu - spada z opóźnieniem */}
      {dripProgress > 0.7 && (
        <div
          style={{
            position: 'absolute',
            left: '75px',
            top: `${450 + dripHeight + 10}px`,
            width: '20px',
            height: '25px',
            backgroundColor: '#DAA520',
            borderRadius: '50% 50% 50% 50%',
            boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
            opacity: interpolate(dripProgress, [0.7, 1], [1, 0]),
          }}
        />
      )}
    </div>
  );
};
