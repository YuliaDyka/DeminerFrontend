import "./loginPage.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login_request } from "../../API/api";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const LoginPage = ({ setAuth }) => {
  return (
    <div>
      <div className="container">
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
            login_request(values, (foundUser) => {
              console.log(foundUser.token);
              localStorage.setItem("login", foundUser.token);
              setAuth(foundUser);
            });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="input_log">
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
              <button className="loginButton" type="submit">
                Log in
              </button>
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
