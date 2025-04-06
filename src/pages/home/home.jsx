import Layout from "../../components/layout/layout";
import Header from "../../components/header/header";
import Map from "../../components/map/map";
import { useState, useEffect } from "react";
import Loading from "../../components/loading/loading";
import { getAllTask, getAllCategories } from "../../requests/itensTeste";
import Footer from "../../components/footer/footer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const Effect = () => {
      loadingTry();
    };
    Effect();
  }, []);

  const loadingTry = async () => {
    setLoading(true);
    try {
      const responses = await getAllTask();
      const statusOrder = [false, true];

      responses.sort((a, b) => {
        const indexA = statusOrder.indexOf(a.isCompleted);
        const indexB = statusOrder.indexOf(b.isCompleted);

        if (indexA === indexB) {
          return 0;
        }

        return indexA - indexB;
      });

      setTasks(responses);
      setTasksFiltered(responses);
      const response = await getAllCategories();
      setCategories(response);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      {error ? <Loading /> : ""}
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
