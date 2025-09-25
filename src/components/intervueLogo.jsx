import sparkle from '../assets/sparkle.svg'

export default function IntervueLogo() {
  return (
    <div>
      <a href="/" className="logo">
        <div className="logo-shape">
          <img src={sparkle} className="sparkle" alt="Sparkle logo" />
          <span>Intervue Poll</span>
        </div>
      </a>
    </div>
  );
}
