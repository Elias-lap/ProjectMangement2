import axios from "axios";
import { createContext, useContext, useEffect, useState ,ReactNode} from "react";
import { BaceUrlCon } from "../context/BaceUrlContext";
interface User {
  id: string;
  userName: string;
}


interface Project {
  id: string;
  title: string;
}


export const AuthDataForUserAndProj = createContext<{ getUserList: () => void; userList: User[]; userProject: Project[] }>({ getUserList: () => {}, userList: [], userProject: [] });

export function ListUserAndProject ({ children }: { children: ReactNode }){

  const [userList, setUserList] = useState<User[]>([]);
  const [userProject, setUserProject] = useState<Project[]>([]);
  console.log(userList)
  // context
  const baceUrlContext = useContext(BaceUrlCon);
  const BaceUrl = baceUrlContext as string;

  const getUserList = async () => {
    try {
      const response = await axios.get(`${BaceUrl}/Users/?pageSize=10&pageNumber=1`, {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      });
      setUserList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectList = async () => {
    try {
      const response = await axios.get(`${BaceUrl}/Project/?pageSize=10&pageNumber=1`, {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      });
      setUserProject(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserList();
    getProjectList(); 
  }, []);

  return (
    <AuthDataForUserAndProj.Provider value={{ getUserList, userList, userProject }}>
      {children}
    </AuthDataForUserAndProj.Provider>
  );
}