import sparkle from "../assets/sparkle.svg";
import RoleCard from "../components/roleCard";
import "./landingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <header>
        <a href="/" className="logo">
          <div className="logo-shape">
            <img src={sparkle} className="sparkle" alt="Sparkle logo" />
            <span>Intervue Poll</span>
          </div>
        </a>
        <h2>
          Welcome to the <strong>Live Polling System</strong>
        </h2>
        <p>
          Please select the role that best describes you to begin using the live
          polling system
        </p>
      </header>

      <div className="role-section">
        <RoleCard role="Student" />
        <RoleCard role="Teacher" />
      </div>

      <button className="continue-btn">Continue</button>
    </div>
  );
}
