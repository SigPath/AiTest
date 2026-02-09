import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { Title } from '../components/Title';
import { Price } from '../components/Price';

/**
 * Single Product Slide Component
 * 
 * WHY separate component: Makes it easy to repeat for multiple products
 * without duplicating layout code. Each slide is self-contained.
 */
const ProductSlide = ({ productData }) => {
  const frame = useCurrentFrame();
  
  // Promo text fade-in (last element)
  const promoOpacity = interpolate(
    frame,
    [45, 75],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: productData.backgroundColor,
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
      }}
    >
      {/* Brand - Top element, subtle and elegant */}
      <Title
        text={productData.brand}
        startFrame={0}
        duration={30}
        style={{
          fontSize: '40px',
          fontWeight: '300',
          marginBottom: '20px',
          opacity: 0.9,
        }}
      />

      {/* Product Name - Primary identifier */}
      <Title
        text={productData.product}
        startFrame={15}
        duration={30}
        style={{
          fontSize: '72px',
          fontWeight: '600',
          marginBottom: '40px',
          textAlign: 'center',
          lineHeight: '1.2',
        }}
      />

      {/* Price - Hero element with emphasis */}
      <Price
        price={productData.price}
        startFrame={30}
        emphasize={true}
        style={{
          marginBottom: '30px',
        }}
      />

      {/* Promotional Text - Supporting claim */}
      <div
        style={{
          fontSize: '32px',
          fontWeight: '400',
          color: '#FFFFFF',
          opacity: promoOpacity,
          textAlign: 'center',
          fontStyle: 'italic',
          maxWidth: '800px',
        }}
      >
        {productData.promoText}
      </div>
    </AbsoluteFill>
  );
};

/**
 * RetailAd Composition - Multi-Product Version
 * 
 * Uses Sequence to show multiple products one after another.
 * Each product gets 90 frames (3 seconds at 30fps).
 * 
 * WHY Sequence: Clean way to compose time-based content.
 * Each sequence resets frame count to 0, so animations work the same.
 * 
 * WHY map: Products come from data array, making it truly data-driven.
 * To add more products, just add them to data.json - no code changes needed.
 * 
 * SCALING: Perfect for batch rendering - load different data.json files
 * and generate videos automatically.
 */
export const RetailAd = ({ data }) => {
  const products = data.products || [data];
  const slideDuration = 90; // 3 seconds at 30fps

  return (
    <>
      {products.map((product, index) => (
        <Sequence 
          key={index}
          from={index * slideDuration} 
          durationInFrames={slideDuration}
        >
          <ProductSlide productData={product} />
        </Sequence>
      ))}
    </>
  );
};
