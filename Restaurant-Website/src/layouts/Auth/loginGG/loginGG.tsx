import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LoginSuccsess = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      localStorage.setItem("Auth", token);
      navigate("/");
    }
  }, [token]);

  if (!token) {
    return (
      <div>
        <h3>Yêu cầu bạn hãy đăng nhập</h3>
      </div>
    );
  }

  return <div></div>;
};

export default LoginSuccsess;
