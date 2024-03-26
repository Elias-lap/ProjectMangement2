import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { BaceUrlCon } from "../context/BaceUrlContext";

interface AuthTasksContextValue {
  listTasks: any[];
  getTasks: (pageNu: number, pageSi: number, title: string, status: string) => Promise<void>;
  pagesArray: number[];
}

export const AuthTasksContext = createContext<AuthTasksContextValue>({
  listTasks: [],
  getTasks: async () => {},
  pagesArray: [],
});


export default function TaskesListContext({ children }: { children: ReactNode }) {

  const baceUrlContext = useContext(BaceUrlCon);
  const BaceUrl = baceUrlContext as string;

  const [listTasks, setListTasks] = useState<any[]>([]);
  const [pagesArray, setPagesArray] = useState<number[]>([]);


  const getTasks = async (pageNu: number, pageSi: number, title: string, status: string) => {

    try {
      const response = await axios.get(`${BaceUrl}/Task/manager`, {
        // const response = await axios.get("https://upskilling-egypt.com:3003/api/v1/Task/manager", {

          headers: {
            Authorization: localStorage.getItem("adminToken"),
          }, params: {
          pageNumber: pageNu,
          pageSize: pageSi,
          title: title,
          status: status,
        },
      });


      const totalPages = response.data.totalNumberOfPages;
      const pagesArray = Array.from(Array(totalPages).keys()).map((num) => num + 1);

      setPagesArray(pagesArray);
      setListTasks(response.data.data); 
      console.log(response.data.data)

    } catch (error) {
      // console.error(error);

    }
  };

  useEffect(() => {
    getTasks(1, 10, "", "");
    // console.log(listTasks)


  }, []);

  return (
    <AuthTasksContext.Provider value={{ listTasks, getTasks, pagesArray }}>
      {children}
    </AuthTasksContext.Provider>
  );
}
