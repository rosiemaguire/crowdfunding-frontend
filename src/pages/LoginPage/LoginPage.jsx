import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../hooks/use-auth";
import LoginForm from "../../components/LoginForm/LoginForm";

function LoginPage() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.token) {
      navigate(`/profile/`);
    }
  }, []);
  return <LoginForm />
}

export default LoginPage;