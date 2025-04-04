import Layout from "../../components/layout/layout";
import style from "./register.module.css";
import FormCard from "../../components/formCard/formCard";
import FormCategory from "../../components/formCategory/formCategory";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const HandleReturn = () => {
    navigate("/ToDoList");
  };
  return (
    <Layout>
      <button onClick={HandleReturn} className={style.buttonReturn}>
        Voltar
      </button>
      <FormCard></FormCard>
      <FormCategory></FormCategory>
    </Layout>
  );
}
