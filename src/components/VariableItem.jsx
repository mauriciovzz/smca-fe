import { useState, useEffect } from "react";
import averageReadingService from "../services/averageReadings";

const VariableItem = ({ node, variable }) => {
  const [averageReadings, setAverageReadings] = useState([]);

  useEffect(() => {
    averageReadingService
      .getAll(node, variable)
      .then((requestedReadings) =>
        setAverageReadings(requestedReadings));
  }, []);

  return (
    <li
      key={variable.id}
      className="mb-2 w-full font-poppins text-[16px] font-normal text-white"
    >
      <div className="flex justify-between">
        <div className="flex w-full">{variable.title}</div>

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
