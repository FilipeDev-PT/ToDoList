import style from "./formCategory.module.css";
import { useState } from "react";
import Icons from "../icons/icons";
import { PostCategories, DeleteCategories } from "../../requests/itensTeste";

export default function FormCategory({
  select,
  setSelect,
  categories,
  formCategory,
  setFormCategory,
}) {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [categoryExist, setCategoryExist] = useState(false);

  const HandleSubmitFormCategories = async (name) => {
    verifyCategoriesExist();
    if (categoryExist) {
      setLoading(true);
      try {
        if (!name) return;
        const newCategory = {
          name: name,
        };
        const response = await PostCategories(newCategory);
        console.log(response);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
        window.location.reload();
      }
    }
  };

  const HandleDeleteCategories = async (id) => {
    setLoading(true);
    try {
      await DeleteCategories(id);
    } catch {
      setError(true);
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

  return (
    <>
      {loading ? <Loading /> : ""}
      {error ? <Loading /> : ""}
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
          <form action={() => HandleSubmitFormCategories(name)}>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome da categoria"
            />
            <p className={categoryExist ? style.pError : style.pDesbility}>
              Categoria Já cadastrada
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
                        onClick={() => HandleDeleteCategories(category.id)}
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
