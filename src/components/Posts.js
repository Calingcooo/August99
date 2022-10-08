import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [ getData, setGetData ] = useState([]);
  const [ search, setSearch ] = useState([]);

  useEffect(() => {
    axios
        .get('https://api.spacexdata.com/v4/launches/')
        .then((response) => {
            console.log(response.data)
            setGetData(response.data)
        })
        .catch((err) => {
            console.log(err)        
        })
}, [])

  return (
    <div className='flex flex-col items-center w-1/2 h-screen'>
      <div className='w-100'>
        <input type='text' placeholder='Enter Keywords' className='w-full border-2'
          onChange={(e) => { setSearch(e.target.value) }}
        />
      </div>
        { 
          getData.filter((item) => {
            if (search == "") {
              return item
            } else if (item.name.toLowerCase().includes(search.toLocaleLowerCase())) {
              return item
            }
          }).map((item) => {
            return <div key={item.id} className='grid grid-cols-4'>
              <div className='p-3 col-span-2 flex flex-col items-center'>
                <img src={item.links.patch.small} alt={item.name}  className=''/>
              </div>
              <div className='col-span-2 flex flex-col justify-center'>
                <h1>Flight Number {item.flight_number}: {item.name} ({item.date_local})</h1>
                <p>Details: {item.details}.</p>
              </div>
            </div>
          })
        }
      </div>
  )
};

export default Posts;