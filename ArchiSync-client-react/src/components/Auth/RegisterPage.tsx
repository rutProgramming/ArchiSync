import { useRef, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";
import "./Auth.css";
import Button from "../S/Button";
import { AppDispatch } from "../../store/reduxStore";
import { useDispatch } from "react-redux";
import { SignUp } from "../../store/Connect";
import { Puser } from "../../types/types";

const RegisterPage = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const roleNameRef = useRef<HTMLSelectElement>(null); 

  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);

    const user: Puser = {
      userName: userNameRef.current?.value?.trim() || "",
      email: emailRef.current?.value?.trim() || "",
      password: passwordRef.current?.value || "",
      RoleName: roleNameRef.current?.value?.trim() || "user", 
    };

    if (!user.userName || !user.email || !user.password) {
      setFormError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const resultAction = await dispatch(SignUp({ user }));
      if (SignUp.fulfilled.match(resultAction)) {
        navigate("/layout", { replace: true });
      } else {
        setFormError(resultAction.error.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setFormError("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-form-container">
            <h2>Create an account</h2>
            <p className="auth-subtitle">Join ArchiSync to manage your architecture projects</p>

            {formError && <div className="auth-error">{formError}</div>}

            <form className="auth-form" onSubmit={handleRegister}>
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
                <label htmlFor="email">Email</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    ref={emailRef}
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

              <div className="form-group">
                <label htmlFor="roleName">Role</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <select
                    id="roleName"
                    ref={roleNameRef}
                    className="form-input"
                    defaultValue="User"
                  >
                    <option value="user">user</option>
                    <option value="architect">architect</option>
                  </select>
                </div>
              </div>


              <div className="terms-agreement">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree to the <a href="#" className="auth-link">Terms of Service</a> and <a href="#" className="auth-link">Privacy Policy</a>
                </label>
              </div>

              <Button type="submit" variant="primary" className="auth-button" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="auth-link">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
