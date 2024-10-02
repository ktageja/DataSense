import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Password validation function
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter"
      );
      return;
    }

    // If validation passes, attempt to create the user
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect to dashboard after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    router.push("/"); // Redirect to homepage
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 className="pt-3 pb-3">Join today.</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <input
            className="form-control text-center mt-2 mb-1"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="form-control text-center mt-2 mb-1"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="form-control text-center mt-2 mb-1"
            type="password"
            value={confirmPassword}
            placeholder="Re-enter Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <input className="mt-2 mb-2" type="checkbox" required /> I agree to
            the terms and conditions
          </label>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            type="submit"
            variant="primary"
            className="btn btn-primary p-1"
          >
            Register
          </Button>
          <Button
            type="button"
            variant="primary"
            className="btn btn-primary p-1"
            onClick={handleCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </div>
      </form>
      <hr />
      <button
        onClick={handleGoogleSignIn}
        className="border border-primary rounded-3 bg-transparent p-2"
      >
        <Image
          src="/assets/images/search.png"
          alt="Google-logo"
          width={20}
          height={20}
        />
        <span className="m-2"> Register with Google</span>
      </button>
    </div>
  );
};

export default Register;
