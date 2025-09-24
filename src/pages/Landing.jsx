import sparkle from "../assets/sparkle.svg";
import RoleCard from "../components/roleCard";

export default function LandingPage() {
  return (
    <div>
      <header>
        <a href="/" className="logo">
          <div className="logo-shape">
            <img src={sparkle} className="sparkle" alt="Sparkle logo" />
            <span>Intervue Poll</span>
          </div>
        </a>
        <h1>
          Welcome to the <strong>Live Polling System</strong>
        </h1>
        <p>
          Please select the role that best describe you to begin using the live
          polling system
        </p>
      </header>
      <div className="roleSection">
        <RoleCard role="Student" />
        <RoleCard role="Teacher" />
      </div>
      <button>Continue</button>
    </div>
  );
}
