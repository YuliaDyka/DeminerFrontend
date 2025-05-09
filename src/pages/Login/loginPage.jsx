import "./loginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <div className="container">
        <form>
          <div className="input">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
          </div>
          <Link to={"/"}>
            <button className="loginButton">Log in</button>
          </Link>
        </form>
        <p>
          Don't have an acount?
          <Link to={"/registrationpage"}>sign up</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
