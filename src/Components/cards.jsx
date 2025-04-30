import { Link } from "react-router-dom";

const Cards = ({ filteredUsers}) => {

    const createSlug = (name) => 
        name.replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    return (
        <div className="flex w-[95%] flex-wrap gap-10 justify-evenly py-6">
            
        {
            filteredUsers.map(dhaicha =>
                
                <div key={dhaicha.id} className="w-full h-fit  max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 p-3 hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-green-700 cursor-pointer">
                    <Link  to={`/${createSlug(dhaicha.Name)}/`}>
    <img className="object-cover w-full h-64 rounded-md" src={dhaicha.image} alt="avatar"/>
    <a href="#" className="font-serif block text-yellow-500 pt-7 text-3xl font-bold text-center" tabIndex="0" role="link">{dhaicha.Name}</a>
    <div className="pb-5 font-bold text-center">
        
        <div className="text-[20px] py-3 text-gray-700 dark:text-gray-200 font-serif">Student</div>

        

        { dhaicha?.HSC != null && (<div className="text-lg text-gray-700 dark:text-gray-200">HSC-GPA: {dhaicha?.HSC == 5 ? (dhaicha.HSC + '.00') : dhaicha?.HSC}</div>)}

        { dhaicha?.bloodGroup != null && (<div className="text-2xl pt-2 text-green-400">BG: {dhaicha.bloodGroup}</div>)}
        
    </div>
    <button className="w-full bg-blue-700 text-2xl cursor-pointer text-white hover:bg-emerald-700 transition duration-200 font-bold p-2 rounded-md">See More</button>
    </Link>
    
    </div>
            )
        }
        </div>
        
    )
}

export default Cards;