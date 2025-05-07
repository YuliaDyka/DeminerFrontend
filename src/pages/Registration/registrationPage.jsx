import "./registrationPage.css";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  return (
    <div>
      <div className="reg_container">
        <form>
          <div className="reg_input">
            <input name="username" placeholder="username" />
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="p" placeholder="confirm password" />
          </div>
          <Link to={"/"}>
            <button className="loginButton">Sign up</button>
          </Link>
        </form>
        <p>
          Already have an acount?
          <Link to={"/loginpage"}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
