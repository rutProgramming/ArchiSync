import { useRef, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Lock, ArrowLeft } from "lucide-react";
import "./Auth.css";
import Button from "../Additional/Button";
import { AppDispatch } from "../../store/reduxStore";
import { useDispatch } from "react-redux";
import { SignIn } from "../../store/Connect";
import { Puser } from "../../types/types";


const LoginPage = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);

    const user: Puser = {
      userName: userNameRef.current?.value?.trim() || "",
      password: passwordRef.current?.value || "",
    };

    if (!user.userName || !user.password) {
      setFormError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const resultAction = await dispatch(SignIn({ user }));
      if (SignIn.fulfilled.match(resultAction)) {
        navigate("/", { replace: true });
      } else {
        setFormError(resultAction.error.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setFormError("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (<>
    <Link to="/" className="back-link">
      <ArrowLeft size={16} />
      <div>Back to Home</div>
    </Link>
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
        </div>

        <div className="auth-form-container">
          <h2>Login to your account</h2>
          <p className="auth-subtitle">Welcome back! Please enter your details.</p>

          {formError && <div className="auth-error">{formError}</div>}

          <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="name">user name</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    ref={userNameRef}
                    className="form-input"
                  />
                </div>
              </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    ref={passwordRef}
                    className="form-input"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" className="auth-button" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="auth-footer">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="auth-link">
                  Sign up
                </Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  </>)
}


export default LoginPage;
