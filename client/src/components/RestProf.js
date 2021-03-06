import React,{useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Img from '../assets/logo.png'


const RestProf = ({restaurant, user}) => {

    const Params = useParams()
    const [thisRestaurant, setThisRestaurant] = useState({})
    const [meals, setMeals] = useState({})

    const name = (Params.name)

    const addMeal = async(item) => {
      if (restaurant) {
        alert('sorry restaurants can not place orders, please create a user account to continue shopping')
      } else{
        try{
        await axios.post('http://localhost:5000/addToCart', {
          name:user.name,
          email:user.email, 
          itemName:item.name,
          itemImg: item.img , 
          prepTime: item.prepTime,
          restEmail:thisRestaurant.email,
          restName:thisRestaurant.name,
          restLocation:thisRestaurant.location, 
          itemCost:item.cost
        })}catch(err){
          console.log(err)
        }
      }
    }

    const findMeals = async() => {
      try{
        const resp = await axios.post('http://localhost:5000/findMeals', {name})
        resp && setMeals(resp.data.dishes)
      }catch(err){
        console.log(err)
      }
    }

    const findRestaurant = async() => {
        try{
          const resp = await axios.post('http://localhost:5000/findRestaurant', {name})
          resp && setThisRestaurant(resp.data)
        } catch(err){
          alert('user not found')
        }
      }

      useEffect(() => {
        findRestaurant()
        findMeals()
      }, [meals])
      

  return (
    <div>
        <div className='flex h-full min-h-screen bg-base place-self-center flex-col w-12/12'>

        <div className='w-full h-full'>
        <img className='w-full h-48 object-cover' src={thisRestaurant?.img}/>
        </div>

            <img className='w-24 h-24 object-cover place-self-center mt-[-40px] border-2 border-black bg-white rounded-full' src={restaurant?.logo? restaurant.logo: Img }/>
        
        <div className='flex place-content-center place-self-center flex-col w-11/12 min-w-250'>
        <p className='w-full text-center text-white m-3 place-self-center text-lg bold'>{thisRestaurant.name}</p>
        <p className='w-full text-center text-sm text-stone-300'>{thisRestaurant.location}</p> 
        </div>

        <div className=' mt-10 place-content-center justify-center place-self-center'>
        <div className='w-5/12 min-w-320 w-full overflow-y-scroll justify-center place-content-center h-96 place-self-center'>
        {
           meals?.length>0 && meals?.filter(meal => meal.available===true).map((item, id) => (
            <div key={id} className="w-full place-self-center flex flex-col">
            <div className="flex flex-row relative">
                <img src={item.img} alt="food item" className="w-10 object-cover h-10 rounded-full" />
                <p className='w-5/12 text-white mx-3 place-self-center text-xs'>{item.name}</p>
    
                <p className='w-2/12 text-center place-self-center text-right text-white text-s'>${item.cost}</p>
                <FontAwesomeIcon onClick={() => addMeal(item)} className='w-2/12 text-lg place-self-center absolute right-0 text-teal' icon={faCartShopping}/>
            </div>
            
            <div className="flex relative row w-full">
            <p className='my-3 place-self-center text-white text-xs'>Info: {item.description}</p>
            </div>
            <hr className='w-full my-3'/>
            </div>
           ))
       }
       
        </div>
        </div>
        
        </div>
    </div>
  )
}

export default RestProf