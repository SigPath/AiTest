import { AbsoluteFill, Sequence } from 'remotion';
import { TIMINGS } from '../constants';
import { EnergyRing } from '../components/effects';
import { 
  DynamicBackground, 
  BrandLogo, 
  ProductTitle, 
  AnimatedPrice, 
  ProductDescription 
} from '../components/ui';

// Static container style - no recreation on every render
const containerStyle = {
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '80px',
  overflow: 'hidden',
};

const ringContainerStyle = {
  position: 'absolute',
};

/**
 * ProductSlide Component
 * 
 * Displays a single product slide with animated elements.
 * Refactored for maximum readability and maintainability.
 * 
 * PERFORMANCE: Static styles extracted to reduce allocation overhead.
 */
const ProductSlide = ({ brand, productName, price, description }) => {
  return (
    <AbsoluteFill style={containerStyle}>
      <DynamicBackground />
      
      <div style={ringContainerStyle}>
        <EnergyRing delay={30} color="rgba(255, 215, 0, 0.6)" maxScale={4} />
        <EnergyRing delay={35} color="rgba(255, 165, 0, 0.5)" maxScale={4.5} />
        <EnergyRing delay={40} color="rgba(255, 255, 255, 0.4)" maxScale={5} />
      </div>
      
      <BrandLogo brand={brand} />
      <ProductTitle productName={productName} />
      <AnimatedPrice price={price} />
      <ProductDescription description={description} />
    </AbsoluteFill>
  );
};

/**
 * RetailAd Composition
 * 
 * Main composition that renders multiple product slides in sequence.
 * 
 * PERFORMANCE NOTE: Uses stable product identifiers for keys to optimize
 * React reconciliation. In production, use unique IDs from database.
 */
export const RetailAd = ({ data }) => {
  const products = data.products || [data];
  
  return (
    <>
      {products.map((product, index) => {
        // Use composite key for better stability
        // In production: use product.id or similar unique identifier
        const key = `${product.brand}-${product.product}-${index}`;
        
        return (
          <Sequence
            key={key}
            from={index * TIMINGS.slideDuration}
            durationInFrames={TIMINGS.slideDuration}
          >
            <ProductSlide
              brand={product.brand}
              productName={product.product}
              price={product.price}
              description={product.promoText}
            />
          </Sequence>
        );
      })}
    </>
  );
};
