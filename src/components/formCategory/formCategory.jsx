import style from "./formCategory.module.css";
import { useState } from "react";
import Icons from "../icons/icons";
import { PostCategories, DeleteCategories } from "../../requests/requests";
import Loading from "../loading/loading";
import { useEffect } from "react";

export default function FormCategory({
  task,
  select,
  setSelect,
  categories,
  formCategory,
  setFormCategory,
}) {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const [categoryExist, setCategoryExist] = useState(false);
  const [categoryUse, setCategoryUsed] = useState(false);
  const [nameWhite, setNameWhite] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setFormCategory(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmitFormCategories = async (event, name) => {
    event.preventDefault();
    verifyCategoriesExist();
    if (name.trim() == "" || name.trim() == undefined) {
      setNameWhite(true);
      return;
    } else {
      setNameWhite(false);
    }

    if (!categoryExist || !categoryUse) {
      setLoading(true);
      try {
        if (!name) return;
        const newCategory = {
          name: name,
        };
        const response = await PostCategories(newCategory);
        console.log(response);
      } catch {
        console.error("Erro na requisição");
      } finally {
        setLoading(false);
        window.location.reload();
      }
    }
  };

  const handleDeleteCategories = async (id) => {
    setLoading(true);
    verifyUsedCategory(id);
    try {
      await DeleteCategories(id);
    } catch {
      console.error("Erro na requisição");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleCloseForm = () => {
    setFormCategory(!formCategory);
    setSelect(!select);
  };

  const verifyCategoriesExist = () => {
    const categora = categories.filter((x) => x.name == name);
    if (categora != "") {
      setCategoryExist(true);
    }
  };

  const verifyUsedCategory = (id) => {
    const verifyUsed = task.filter((x) => x.categoryId == id);
    if (verifyUsed != "") {
      setCategoryUsed(true);
    }
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div
        className={`${style.containerFormCategories} ${
          formCategory ? style.formCategoryOpen : style.formCategoryClose
        }`}
      >
        <div className={style.divFormCategory}>
          <Icons
            name="X"
            className="iconsClosefilter"
            onClick={handleCloseForm}
          />
          <h4>Cadastrar Nova Categoria</h4>
          <form onSubmit={(event) => handleSubmitFormCategories(event, name)}>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome da categoria"
            />
            <p className={categoryExist ? style.pError : style.pDesbility}>
              Categoria Já cadastrada
            </p>
            <p className={categoryUse ? style.pError : style.pDesbility}>
              Categoria com Tarefa cadastrada!
            </p>
            <p className={nameWhite ? style.pError : style.pDesbility}>
              Nome da categoria em branco
            </p>
            <button type="submit">Criar Categoria</button>
          </form>
          <div className={style.divContentCategories}>
            <h4>Categorias Existentes</h4>
            <div>
              {categories.map((category, index) => {
                return (
                  <div key={index} className={style.divItensCategories}>
                    <div>
                      <h5>{category.name}</h5>
                    </div>
                    <div>
                      <Icons
                        name={"Trash2"}
                        onClick={() => handleDeleteCategories(category.id)}
                        className={"iconsDelete"}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
