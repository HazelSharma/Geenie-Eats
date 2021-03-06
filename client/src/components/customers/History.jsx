import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDollarToSlot, faPerson, faPlateWheat } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const History = ({user}) => {
    const [theOrders, settheOrders] = useState([])


    const findTime = (order) => {
      let oldDateObj = new Date(order.placedAt)
      let diff = order.prepTime 
      return new Date(oldDateObj.getTime() + diff*60000).toLocaleTimeString();
    }

    const getOrders = async() => {
        try{
            const resp = await axios.post(`http://localhost:5000/history/${user.email}`)
            settheOrders((resp.data).sort((a,b)=>{
                if (a.completed>b.completed) return -1;
                if (a.completed < b.completed) return 1;
                return 0;
            }))
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getOrders()
    }, [theOrders])
    

  return (

    <div className='p-10  sm:p-20 bg-base h-full min-h-screen w-full text-white'>
         <p className='text-2xl font-bold text-white tracking-widest'>Past Orders</p>

         <div className=' w-11/12screen lg:w-100per'>
         <div className='w-full p-12 mt-10 overflow-auto  bg-dblue'>
             <div className='flex flex-row mb-5'>
            <p className='min-w-250 w-250 text-lg mt-2 text-white italic font-bold'>Restaurant</p>
            <p className='min-w-250 w-250 text-lg mt-2 text-white italic font-bold'>Item & quantity</p>
            <p className='w-100 min-w-100 text-lg mt-2 text-white italic font-bold'>Cost</p>
            <p className='min-w-200 w-200 text-lg mt-2 text-white italic font-bold'>Status</p>
            </div>
            <hr className='w-screen md:w-8/10screen bg-white'/>
            <div className='mt-5 max-h-80'>
            {
                theOrders?.map(order => (
                    <div key={order._id} className='w-full h-24 center  mt-2 flex flex-row'>
                    <div className='w-250  min-w-250  align-center flex flex-col'>
                     <p className='text-md text-white'>{order.name}</p>
                     <p className='text-sm text-stone-300'>{order.email}</p>
                    </div>

                    <div className='w-250 min-w-250  mt-2 align-center flex flex-row'>
                    <img className='w-8 h-8 rounded-full mr-3 object-cover' src={order.itemImg}/>
                     <p className='text-sm text-stone-300'><span className='underline mr-2 font-bold'>{order.quantity} </span> of {order.itemName}</p>
                    </div>

                    <p className='w-100 mt-2 min-w-100 text-md text-white'>${order.itemCost* order.quantity }</p>

                    <div className={`${order.completed === 'pending' && 'bg-red-400'} ${order.completed === 'created' && 'bg-purple-400'} ${order.completed === 'completed' && 'bg-teal'}  mt-2 hover:scale-x-105 cursor-pointer w-200 min-w-200 place-content-center flex flex-row h-10 rounded-lg  px-3 py-2`}>
                     <p className='text-md place-self-center text-white'>{order.completed === 'pending' && order.prepTime ?(findTime(order)) :order.completed}</p>
                     </div>

                    </div>
                ))
            }
                        </div>
         </div>
         </div>
    </div>
  )
}

export default History