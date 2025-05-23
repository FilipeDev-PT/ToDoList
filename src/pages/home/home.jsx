import Layout from "../../components/layout/layout";
import Header from "../../components/header/header";
import Map from "../../components/map/map";
import { useState, useEffect } from "react";
import Loading from "../../components/loading/loading";
import { getAllTask, getAllCategories } from "../../requests/requests";
import Footer from "../../components/footer/footer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    loadingTry();
  }, []);

  const loadingTry = async () => {
    setLoading(true);
    try {
      const responses = await getAllTask();
      const statusOrder = [false, true];

      responses.sort((a, b) => {
        const Conpleted = statusOrder.indexOf(a.isCompleted);
        const pendent = statusOrder.indexOf(b.isCompleted);

        if (Conpleted === pendent) {
          return 0;
        }

        return Conpleted - pendent;
      });

      setTasks(responses);
      setTasksFiltered(responses);
      const response = await getAllCategories();
      setCategories(response);
    } catch {
      console.error("Erro na requisição");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <Layout>
        <Header
          setTasksFiltered={setTasksFiltered}
          categories={categories}
          task={tasks}
          search={search}
          setSearch={setSearch}
        />
        <Map tasksFiltered={tasksFiltered} />
        <Footer task={tasks} categories={categories} />
      </Layout>
    </>
  );
}
