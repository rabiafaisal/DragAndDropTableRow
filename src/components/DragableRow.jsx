
import React, { useState, useRef } from 'react';

 
const DragableRow = () => {
  
  const dragRow = useRef();
  const dragOverItem = useRef();
  const [rows, setRows] = useState([{
    recipeName: "Ragga Muffin",
    mealType: "Breakfast",
    prepTime: "30 min",
    serves: "2",
  },
  {
    recipeName: "Rasta Salata",
    mealType: "Vegan",
    prepTime: "45 min",
    serves: "4",
  },
  {
    recipeName: "Green Pork",
    mealType: "Lunch",
    prepTime: "60 min",
    serves: "6",
  },]);
 
  const dragStart = (e, position) => {
    dragRow.current = position;
    console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const drop = (e) => {
    const copyRowItems = [...rows];
    const dragRowContent = copyRowItems[dragRow.current];
    copyRowItems.splice(dragRow.current, 1);
    copyRowItems.splice(dragOverItem.current, 0, dragRowContent);
    dragRow.current = null;
    dragOverItem.current = null;
    setRows(copyRowItems);
  };
 
  return (
    <>
    
    <div className='flex-wrap ml-4'>  
    <img src='../images/logo.png' className='w-14 h-5  mt-3'/> 
    <table className="w-auto rounded-md mt-5">
        <thead className='text-xs text-[#0064FF] uppercase bg-blue-50 dark:bg-[#0064FF] dark:text-blue-400'>
          <tr className="border-b border-blue-500">
            <th className='text-md px-6 py-1'>Recipe Name</th>
            <th className='text-md px-6 py-1'>Meal Type</th>
            <th className='text-md px-6 py-1'>Prep.Time</th>
            <th className='text-md px-6 py-1'>serves</th>
            <th className='text-md px-6 py-1'></th>
          </tr>
        </thead>
        <tbody>
          { rows&&rows.map((row, index) => (
            <tr className='border-b border-blue-500'
              key={index}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              draggable
            >
              <td className='text-md px-6 py-1'>{row.recipeName}</td>
              <td className='text-md px-6 py-1'>{row.mealType}</td>
              <td className='text-md px-6 py-1'>{row.prepTime}</td>
              <td className='text-md px-6 py-1'>{row.serves}</td>
              <td colSpan={3}><button className='bg-[#0064FF] rounded text-sm px-5 text-white font-semibold py-1'>Edit Recipe</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default DragableRow
