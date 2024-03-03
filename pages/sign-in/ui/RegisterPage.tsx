import { Form, Link, useActionData } from "@remix-run/react";

import type { register } from "../api/register";

export function RegisterPage() {
  const registerData = useActionData<typeof register>();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            {registerData?.error && (
              <ul className="error-messages">
                {registerData.error.errors.body.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            <Form method="post">
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
