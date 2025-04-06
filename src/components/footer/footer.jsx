import style from "./footer.module.css";
import Icons from "../icons/icons";
import { useState } from "react";
import FormCard from "../formCard/formCard";
import FormCategory from "../formCategory/formCategory";

export default function Footer({ task, categories }) {
  const [select, setSelect] = useState(false);
  const [formCategory, setFormCategory] = useState(false);
  const [formCard, setFormCard] = useState(false);

  const HandlePageRegister = () => {
    setSelect(!select);
  };

  return (
    <div className={style.divFooter}>
      <div className={style.butAdd} onClick={HandlePageRegister}>
        <Icons
          name={"Plus"}
          className={`${select ? "butSelect" : "iconsAdd"}`}
        />
      </div>
      <div
        className={`${style.divContentButonsRegister} ${
          select ? style.selectRegisterOpen : style.selectRegisterClose
        }`}
      >
        <button onClick={() => setFormCard(!formCard)}>Tarefa</button>
        <button onClick={() => setFormCategory(!formCategory)}>
          Categoria
        </button>
      </div>

      <FormCard
        task={task}
        select={select}
        setSelect={setSelect}
        categories={categories}
        formCard={formCard}
        setFormCard={setFormCard}
      />

      <FormCategory
        select={select}
        setSelect={setSelect}
        categories={categories}
        formCategory={formCategory}
        setFormCategory={setFormCategory}
      />
    </div>
  );
}
