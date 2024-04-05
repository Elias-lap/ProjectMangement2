import React from "react";
import Tasks from "./Tasks";

type Status = "ToDo" | "Done" | "InProgress";
type UpdateCards = (id: string, newStatus: Status) => void;
type Card = { id: string; title: string; status: string; description: string };
type Cards = Card[];
type ColumnProps = {
  
  cards: Cards;
  status: Status;
  updateCards: UpdateCards;
};
export default function Column({  status, cards, updateCards }: ColumnProps) {
  const [isDraggingOver, setIsDraggingOver] = React.useState<boolean>(false);
  const filteredCards = cards?.filter((card) => card.status == status);



  return (
    <div
        
          onDrop={(e) => {
            e.preventDefault();
            setIsDraggingOver(false);
            const curentId =  e.dataTransfer.getData("dataid");
            const curentStatus = e.dataTransfer.getData("currentStatus");
            const newStatus = status
            console.log(curentId, curentStatus ,newStatus );
            updateCards(curentId ,newStatus)
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDraggingOver(false);
          }}
          className={`col-md-3 mx-1 rounded  ${
            isDraggingOver ? "custom-box-shadow" : ""
          }`}
        >
          <h2 className=" text-muted"> {status} </h2>
          <div className=" color-box-Taks p-3  rounded-1">
            {filteredCards &&
              filteredCards.map((task) => {
                return (
                  <Tasks id={task.id} status={task.status} title={task.title} />
                );
              })}
          </div>
        </div>
  )
}
