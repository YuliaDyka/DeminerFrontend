import "./loginPage.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login_request } from "../../API/api";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    // .matches(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, "Invalid email")
    .required("Required"),
  password: Yup.string()
    // .min(5, "Password must have at least 5 characters")
    .required("Required"),
});

const LoginPage = ({ setAuth }) => {
  return (
    <div>
      <div className="container">
        {/* <div className="input">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
          </div> */}
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
            login_request(values, (foundUser) => {
              console.log(foundUser.token[0]);
              localStorage.setItem("login", foundUser.token[0]);
              setAuth(foundUser);
            });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="input">
                <div>
                  <Field name="email" id="email" placeholder="Email" />
                  {errors.email && touched.email ? (
                    <div className="input_error">*{errors.email}</div>
                  ) : null}
                </div>

                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && touched.password ? (
                    <div className="input_error">*{errors.password}</div>
                  ) : null}
                </div>
              </div>
              {/* <Link to={"/"}> */}
              <button className="loginButton" type="submit">
                Log in
              </button>
              {/* </Link> */}
            </Form>
          )}
        </Formik>
        <p>
          Don't have an acount?
          <Link to={"/registrationpage"}>sign up</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
