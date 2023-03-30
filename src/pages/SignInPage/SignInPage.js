import { Form } from "../../assets/styles/Form";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";

export function SignInPage() {
  function signIn(e) {
    e.preventDefault();
  }

  return (
    <>
      <Header />

      <Form onSubmit={signIn}>
        <input placeholder="E-mail" type="email" required />
        <input placeholder="Senha" type="password" required />

        <button>Entrar</button>
        
        <Link to={"/sign-up"}>
          Não tem uma conta? Cadastre-se!
        </Link>
      </Form>
    </>
  );
}
