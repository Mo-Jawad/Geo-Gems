import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function StudentDetails() {
  const { studentId } = useParams();
  console.log(studentId)
  const [dhainchas, setDhainchas] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect( () => {
     const fetchDatafunc = async () => {
      try {
        const responded = await fetch('../../public/Datafet.json');
        console.log(responded)
        if (!responded.ok) {
          throw new Error('Failed to fetch data');
        }

        
        const dataInt = await responded.json();
        console.log(dataInt);
        
        const found = dataInt.Dhaicha.find(stu => stu.Name.toLowerCase() === studentId.toLowerCase());

        setDhainchas(found)

        setLoading(false)
      
        
        
        
        
        
         // Update state with the fetched data
        
        
        
        
      } catch (error) {
        throw new Error("Error:", error); // Handle errors
      }
  };
      
      
  fetchDatafunc()

}, [studentId]);

  return (
    <div className=' h-[42rem] w-full p-4 pt-8 bg-gray-700 items-center '>
      {loading ? <div className='h-[35rem] w-full flex justify-center items-center'> <span className="loading loading-infinity h-[7rem] w-[7rem] text-success justify-center items-center"></span> </div> : (
        <>
        <div className='flex justify-between px-8'>
        <h2 className='font-bold text-white text-2xl tracking-widest font-mono'>{dhainchas.Name}'s Details</h2>
        <Link className='p-3 px-5 hover:text-white text-black transition-colors duration-200 bg-green-500 rounded-md hover:bg-gray-700 hover:border-green-400 border-3 font-bold border-gray-700 font-serif' to="/">Back To Home</Link>
      </div><div className='w-full h-full pb-5'>
          <div className='flex items-center justify-around h-full'>
            <figure className='flex h-auto'>
              <img className=" w-95 h-95 rounded-md items-center hover:scale-110 transition duration-150" src={`../../${dhainchas.image}`} alt={dhainchas.name} />
            </figure>

            <div className='w-2xl h-fit flex-col rounded-md shadow-md hover:shadow-green-600 text-center items-center justify-center p-5 py-8 text-2xl  font-bold text-orange-400 border-2 border-amber-400 bg-gray-800 transition duration-200'>
              <div className='flex-col pl-4 font-mono space-y-3 justify-start text-start h-full'>
                <h2>Name : {dhainchas.Name}</h2>
                <h4>Home Town : {dhainchas.hometown}</h4>
                { dhainchas?.SSC != null && (<p>SSC-GPA : {dhainchas?.SSC == 5 ? (dhainchas.SSC + '.00') : dhainchas?.SSC}</p>)}
                { dhainchas?.HSC != null && (<p>HSC-GPA : {dhainchas?.HSC == 5 ? (dhainchas?.HSC + '.00') : dhainchas?.HSC}</p>)}

                { dhainchas?.bloodGroup != null && (<div className="text-2xl text-green-400">Blood Group: {dhainchas.bloodGroup}</div>)}

                {(dhainchas?.behavior != null && dhainchas.id !== 8) && (
                  <div className='flex-col items-start space-y-2 text-green-400 font-normal font-serif'>
                    <div className='w-full '>characteristics:</div>

                    <ul>
                      {dhainchas.behavior?.map((behave, index) => <div className='pl-12'><li key={index}>  {`    ${index + 1}.  
              ${behave}`}</li></div>)}
                    </ul>
                  </div>)}
              </div>
            </div>
          </div>
        </div></>)}
      
      
    </div>
  );
}

export default StudentDetails;