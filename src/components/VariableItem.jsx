import { useState, useEffect } from "react";
import averageReadingService from "../services/averageReadings";

const VariableItem = ({ nodeLocation, variable }) => {
  const [averageReadings, setAverageReadings] = useState([]);
  var currentDate = new Date();
  var fullDate = currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" +  currentDate.getDate();

  useEffect(() => {
    averageReadingService
      .getAll(nodeLocation, variable, fullDate)
      .then((requestedReadings) =>
        setAverageReadings(requestedReadings));
  }, []);

  return (
    <li
      key={variable.variable_name}
      className="mb-2 w-full font-poppins text-[16px] font-normal text-white"
    >
      <div className="flex justify-between"> 
        <div className="flex w-full">
          {variable.variable_name}
        </div>

        <div className="flex w-full">
          {averageReadings.map((value) => {
            let color = "";
            value > 15 ? (color = "bg-lime-400") : (color = "bg-red-600");
            return <div key={value} className={`w-full flex-1 ${color}`}></div>;
          })}
        </div>
      </div>
    </li>
  );
};

export default VariableItem;
