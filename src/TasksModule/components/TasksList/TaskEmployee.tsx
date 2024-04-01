import React from "react";
import axios from "axios";
import Column from "./Column";
type Status = "ToDo" | "Done" | "InProgress";
type UpdateCards = (id: string, newStatus: Status) => void;
type Cards = Card[];
type Card = { id: string; title: string; status: string; description: string };
export default function TaskEmployee() {

  const [cards, setCards] = React.useState<Cards>([]);
  const updateCards :UpdateCards= async (id, newStatus )=> {
      
    const newCards = cards.map((task)=>{
        if (task.id != id) return task
        if (task.status == newStatus) task
        const newCard = { ...task, status: newStatus };
       return newCard;
    })
    setCards(newCards)
    try {
      const adminToken = localStorage.getItem("adminToken");
      const response = await axios.put(
        `https://upskilling-egypt.com:3003/api/v1/Task/${id}/change-status`,
        { status: newStatus }, // Pass status in the request body
        {
          headers: {
            Authorization: adminToken,
          }
        }
      );
  
      console.log(response.data); // Log the response if needed
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  React.useEffect(() => {
    const gettasks = async () => {
      const adminToken = localStorage.getItem("adminToken");
      const response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Task",
        {
          headers: {
            Authorization:adminToken
            ,
          },
        }
      );
      const AllTasks = response.data.data;
      setCards(AllTasks);
      console.log(AllTasks);
    };

    gettasks();
  }, []);

  return (
    <div className=" container-TasksBoard bg-gray  container">
      <div className="BoxTasks row  w-100  justify-content-between ">
        <Column
            updateCards={updateCards}
            cards={cards}
            status="ToDo"
          
        />
        <Column
            updateCards={updateCards}
            cards={cards}
            status="InProgress"
        />
        <Column
            updateCards={updateCards}
            cards={cards}
            status="Done"
          
        />
      
      </div>
    </div>
  );
}
