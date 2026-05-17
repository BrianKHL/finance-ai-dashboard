import { useState } from "react";
import "./AuthPage.css";

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

function AuthPage({ mode, error, onSubmit, onModeChange }) {
  const [formValues, setFormValues] = useState(defaultValues);

  const isLogin = mode === "login";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(formValues);
  };

  const switchMode = (nextMode) => {
    setFormValues(defaultValues);
    onModeChange(nextMode);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Finance AI Dashboard</h1>
        <p>{isLogin ? "Log in to view your dashboard." : "Create your account to get started."}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin ? (
            <input
              name="name"
              placeholder="Full name"
              value={formValues.name}
              onChange={handleChange}
              required
            />
          ) : null}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
            required
          />

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit">
            {isLogin ? "Log In" : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <span>{isLogin ? "Need an account?" : "Already have an account?"}</span>
          <button
            type="button"
            className="link-button"
            onClick={() => switchMode(isLogin ? "signup" : "login")}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>

        <div className="demo-box">
          <strong>Demo account</strong>
          <p>Email: demo@financeai.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
