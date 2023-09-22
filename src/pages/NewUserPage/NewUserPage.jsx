import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../hooks/use-auth";
import NewUserForm from "../../components/UserForm/UserForm";

function NewUserPage() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.token) {
      navigate(`/profile/`);
    }
  }, []);
  return (<NewUserForm />);
}

export default NewUserPage;