import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import {
  ShowWhenLoggedIn,
  ShowWhenLoggedOut,
} from "../../components/protect/HiddenLinks";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <RiProductHuntLine size={35} />
        </div>
        <ul className="home-links">
          <ShowWhenLoggedOut>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowWhenLoggedOut>
          <ShowWhenLoggedOut>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowWhenLoggedOut>
          <ShowWhenLoggedIn>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowWhenLoggedIn>
        </ul>
      </nav>
      <section className="container hero">
        <div className="hero-text">
          <h2>Inventory & Stock Management Solution</h2>
          <p>
            Inventory system to control and manage products in the warehouse in
            real time and integrated to make it easier to develop your business.
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Free trial 1 month</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText number="14K" text="Brand Owners" />
            <NumberText number="23K" text="Active Users" />
            <NumberText number="500+" text="Partners" />
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ number, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{number}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
