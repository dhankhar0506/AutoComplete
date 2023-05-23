import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FcSearch } from 'react-icons/fc';
import './AutocompleteSearchBar.css'

export function AutocompleteSearchBar(){

const [searchTerm , setsearchTerm] = useState("");
const [states , setStates] = useState([]);
const [filteredState, setFilteredState] = useState([]);


useEffect(()=>{
   async function fetchData(){
        try{
         const reponse = await axios.get('http://cdn-api.co-vin.in/api/v2/admin/location/states');
         setStates(reponse.data.states)
        } catch(error){
          console.log(error)
        }
    }
    fetchData()
}, []);


function handleInputChange(event){
    const searchTerm = event.target.value
    setsearchTerm(searchTerm);

    const filtered = states.filter((state) =>

    state.state_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredState(filtered)
}

    return(
        <>
        <div className="search-bar">
        <FcSearch className='search-icon'/>
            <input 
            type="text"
             placeholder='Search' 
             onChange={handleInputChange}
             value={searchTerm}
             />
              
        </div>
        <ul className='sreach-list'>
            {
                filteredState.map((state) => (
                    <li key={state.state_id}>{state.state_name}</li>

                ))
            }
        </ul>
        </>
    )
}
