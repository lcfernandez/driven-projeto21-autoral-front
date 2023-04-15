import { Form } from "../../assets/styles/Form";
import { WHITE_COLOR } from "../../constants/color";
import { HeaderAuth } from "../../components/HeaderAuth";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export function SignInPage() {
  const [token, setToken] = useContext(UserContext);

  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/projects");
  }, [navigate, token]);

  function signIn(e) {
    e.preventDefault();

    setDisabled(true);

    const body = {
      email,
      password
    };

    axios
      .post(`${process.env.REACT_APP_API_URI}/sign-in`, body)
      .then(
        res => {
          localStorage.setItem("token", res.data);
          setToken(res.data);
          navigate("/projects");
        }
      )
      .catch(
        err => {
          alert(err.response.data.message || err.response.data);
          setDisabled(false);
        }
      );
  }

  return (
    <>
      <HeaderAuth />

      <Form onSubmit={signIn}>
        <input
          disabled={disabled && true}
          onChange={e => setEmail(e.target.value)}
          placeholder="E-mail"
          required
          type="email"
        />
        <input
          disabled={disabled && true}
          onChange={e => setPassword(e.target.value)}
          placeholder="Senha"
          required
          type="password"
        />

        <button disabled={disabled && true}>
          {disabled ?
            <ThreeDots
              ariaLabel="three-dots-loading"
              color={WHITE_COLOR}
              height={50}
            	width={50}
            />
          : "Entrar"}
        </button>
        
        <Link to={"/sign-up"}>
          Não tem uma conta? Cadastre-se!
        </Link>
      </Form>
    </>
  );
}
