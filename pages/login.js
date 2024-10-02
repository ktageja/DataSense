import { useSession, signIn } from "next-auth/react";

import { Card, Form, Alert, Button } from "react-bootstrap";
import { authenticateUser } from "@/lib/authenticate";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { favouritesAtom, searchHistoryAtom } from "../store/store";
import { useAtom } from "jotai";
import Image from "next/image"; // Corrected import for Image component

export default function Login(props) {
  const { data, status } = useSession();
  console.log({ data, status });

  // const [historyList, setSearchHistory] = useAtom(searchHistoryAtom);

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // async function updateAtoms() {
  //   // setSearchHistory(await getHistory());
  // }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("login with email/password is not implemented!");
    // try {
    //   await authenticateUser(user, password);
    //   console.log("1");

    //   await updateAtoms();
    //   console.log("2");

    //   router.push("/dashboard");
    // } catch (err) {
    //   setWarning(err.message);
    // }
  }

  // const handleGoogleLogIn = async () => {
  //   try {
  //     // await signInWithPopup(auth, provider);
  //     const res = await signIn("google");
  //     console.log("###", res);
  //     // router.push("/dashboard"); // Redirect to dashboard after successful login
  //   } catch (error) {
  //     setWarning(error.message); // Corrected the error handling function name
  //   }
  // };
  useEffect(() => {
    if (status === "authenticated" && data) {
      console.log({ data });
      router.push("/dashboard");
    }
  }, [data, status]);

  return (
    <>
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Welcome back.</h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Email"
              type="text"
              id="userName"
              name="userName"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Control
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {warning && (
            <>
              <br />
              <Alert variant="danger">{warning}</Alert>
            </>
          )}
          <br />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="primary" className="pull-right p-1" type="submit">
              Login
            </Button>
            <Button variant="primary" className="pull-right p-1" type="submit">
              Cancel
            </Button>
          </div>
        </Form>
        <hr />
        <button
          onClick={() => signIn("google")}
          className="border border-primary rounded-3 bg-transparent p-2"
        >
          <Image
            src="/assets/images/search.png"
            alt="Google-logo"
            width={20}
            height={20}
          />
          <span className="m-2">Login with Google</span>
        </button>
      </div>
    </>
  );
}
