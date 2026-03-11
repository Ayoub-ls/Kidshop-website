import { useContext, useState } from "react";
import { ProductContext } from "../context/GlobalContext.jsx";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";

const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(input: { username: $username, email: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

const LOGIN = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

const Login = () => {
  const { token, navigate, logout, setToken } = useContext(ProductContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [currentState, setCurrentState] = useState("Sign Up");

  const toggleStateHandler = () => {
    setCurrentState((prev) => (prev === "Sign Up" ? "Login" : "Sign Up"));
  };

  const [registerUser, { loading: registerLoading }] = useMutation(REGISTER);
  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const { data } = await registerUser({
          variables: {
            username: name,
            email,
            password,
          },
        });

        const jwt = data?.register?.jwt;
        if (jwt) {
          setToken(jwt);
          localStorage.setItem('token',jwt)
          toast.success("Account created!");
        }
      } else {
        const { data } = await loginUser({
          variables: {
            identifier: email,
            password,
          },
        });

        const jwt = data?.login?.jwt;
        if (jwt) {
          setToken(jwt);
          localStorage.setItem('token',jwt)
          toast.success("Logged in!");
        }
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen">
      {token === "" ? (
        <form
          onSubmit={onSubmitHandler}
          className="flex h-full flex-col justify-center items-center gap-4"
        >
          {currentState === "Sign Up" ? (
            <input
              className="px-2 py-1 mb-4 rounded-xl bg-white shadow-xl w-3/4"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="E-mail Address"
            />
        ) : null}

            <input
              className="px-2 py-1 mb-4 rounded-xl bg-white shadow-xl w-3/4"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Username"
            />

          <input
            className="px-2 py-1 rounded-xl bg-white shadow-xl w-3/4"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />

          <div className="flex justify-end w-3/4">
            <p
              className="font-light underline cursor-pointer"
              onClick={toggleStateHandler}
            >
              {currentState === "Sign Up" ? "Login" : "create account"}
            </p>
          </div>

          <button
            disabled={registerLoading || loginLoading}
            className="text-xl rounded-full bg-main px-8 py-3.5 justify-center"
          >
            {registerLoading || loginLoading ? "Loading..." : currentState}
          </button>
        </form>
      ) : (
        <div className="py-1 px-8.5">
          <h1 className="text-sm mb-5 font-bold">Account</h1>
          <h1
            onClick={logout}
            className="text-sm mb-5 text-zinc-700 cursor-pointer w-fit"
          >
            Logout
          </h1>
        </div>
      )}
    </div>
  );
};

export default Login;
