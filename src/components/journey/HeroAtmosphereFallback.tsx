/** CSS-only hero atmosphere — instant paint when WebGL assets are missing or slow. */
export default function HeroAtmosphereFallback() {
  return (
    <div className="hero-atmosphere-fallback" aria-hidden>
      <div className="hero-atmosphere-fallback__glow hero-atmosphere-fallback__glow--blue" />
      <div className="hero-atmosphere-fallback__glow hero-atmosphere-fallback__glow--gold" />
      <div className="hero-atmosphere-fallback__grid" />
      <div className="hero-atmosphere-fallback__arc" />
    </div>
  );
}
