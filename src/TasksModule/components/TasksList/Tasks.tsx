interface DataTypesUser {
  id: string;
  title?: string;
  status: string;
}
export default function Tasks({ id, title, status }: DataTypesUser) {


  return (

    <div 
    onDragStart={(e)=>{
         e.dataTransfer.setData('dataid' , id)
           e.dataTransfer.setData('currentStatus' , status)
    }}
    onDragEnd={(e)=>{
      console.log(e)
    }}
    draggable={true} className=" w-90  bg-yellow rounded-2  p-1 mb-2 custom-cursor dragging">
      <p className=" text-white">{title}</p>
    </div>
  );
}
