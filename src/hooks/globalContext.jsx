import { createContext, useState, useContext, useEffect } from "react";
import {
  DeleteCategories,
  DeleteTask,
  getAllCategories,
  getAllTask,
  PostCategories,
  PostTask,
  PutTask,
} from "../requests/itensTeste";
import Loading from "../components/loading/loading";

const GlobalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const Effect = () => {
      loadingTry();
    };
    Effect();
  }, []);

  const loadingTry = async () => {
    setLoading(true);
    try {
      const response = await getAllCategories();
      setCategories(response);

      const responses = await getAllTask();
      setTasks(responses);
      setTasksFiltered(responses);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const HandleCompleteTask = async (id) => {
    setLoading(true);
    try {
      await PutTask(id);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const HandleDeleteTask = async (id) => {
    setLoading(true);
    try {
      await DeleteTask(id);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      window.location.reload();
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

  const HandleSearchTasks = (e) => {
    setTasksFiltered(
      tasks.filter((x) =>
        x.title.toLocaleLowerCase().includes(e.toLocaleLowerCase())
      )
    );
  };

  const handleSearchCategories = (e) => {
    if (e == "") {
      setTasksFiltered(tasks);
    } else {
      setTasksFiltered(
        tasks.filter(
          (x) => x.category.toLocaleLowerCase() == e.toLocaleLowerCase()
        )
      );
    }
  };

  const handleSearchStatus = (e) => {
    if (e == "") {
      setTasksFiltered(tasks);
    } else {
      setTasksFiltered(tasks.filter((x) => x.isCompleted.toString() === e));
    }
  };

  const HandleSubmitFormTask = async (title, category) => {
    setLoading(true);
    try {
      if (!title || !category) return;
      const newTask = {
        title: title,
        categoryId: category,
      };
      const response = await PostTask(newTask);
      console.log(response);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const HandleSubmitFormCategories = async (name) => {
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
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      {error ? <Loading /> : ""}
      <GlobalContext.Provider
        value={{
          tasks,
          categories,
          tasksFiltered,
          setTasksFiltered,
          HandleCompleteTask,
          HandleDeleteTask,
          HandleSearchTasks,
          handleSearchCategories,
          HandleSubmitFormTask,
          HandleSubmitFormCategories,
          handleSearchStatus,
          HandleDeleteCategories,
          setLoading,
          setError,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
};
