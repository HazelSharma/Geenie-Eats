import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useCookies} from 'react-cookie'
import { faHouse, faPizzaSlice, faEarthAmericas, faArrowLeft, faUtensils, faBurger } from '@fortawesome/free-solid-svg-icons'

const SideBar = ({restaurant}) => {


  const [cookies, setCookie, removeCookie] = useCookies([])
const restElements = [
  {
    name:'restaurants',
    disName:'Home',
    icon:faHouse
  },
  {
    name:`order/${restaurant?.name}`,
    disName:'Profile',
    icon:faPizzaSlice
  },
  {
    name:'manageMeals',
    disName:'Manage Meals',
    icon:faUtensils
  },
  {
    name:"orders",
    disName:'orders',
    icon:faBurger
  },
  {
    name:'myImpact',
    disName:'Impact',
    icon:faEarthAmericas
  }
]

const userElements = [
    {
      name:'Home',
      disName:'Home',
      icon:faHouse
    },
    {
      name:'History',
      disName:'History',
      icon:faPizzaSlice
    },
    {
      name:'myImpact',
      disName:'Impact',
      icon:faEarthAmericas
    }
]

const logout = () => {
  removeCookie("email", {path:'/'})
  removeCookie("email", {path:'/restaurants'})
  Navigate('/login')
}

  const Navigate = useNavigate()
const [page, setPage] = useState('Home')
  return (
    <div className='min-w-100 md:min-w-0 md:w-full relative h-screen flex flex-col place-content-center align-center bg-dblue text-center'>
      <div className="w-full h-screen justify-center text-center center place-content-center align-center place-self-center flex flex-col">
      
      {restaurant? restElements.map((item) => {
            return(
              <div key={item.name} className="flex flex-col" onClick={() => setPage(item.name)} >
                <div className={`w-12 hover:scale-105  h-12 shadow-black shadow-2 rounded-xl place-self-center place-content-center center text-center justify-center flex flex-col bg-teal`}>
                <div onClick={()=> Navigate(`/restaurants/${item.name}`)}>
                <FontAwesomeIcon color={page === item.name?'teal':'white'} className='fa-md' icon={item.icon}/>
                </div>
                </div>
                    <p className='text-white text-sm mb-5'>{item.disName}</p>
              </div>
            )
        }):
        userElements.map((item) => {
          return(
            <div key={item.name} className="flex flex-col" onClick={() => setPage(item.name)} >
              <div className={`w-12 hover:scale-105  h-12 shadow-black shadow-2 rounded-xl place-self-center place-content-center center text-center justify-center flex flex-col bg-teal`}>
              <NavLink to={item.name}>
              <FontAwesomeIcon color={page === item.name?'teal':'white'} className='fa-md' icon={item.icon}/>
              </NavLink>
              </div>
                  <p className='text-white text-sm mb-5'>{item.disName}</p>
            </div>
          )
      })}

      </div>
      <div onClick={() => logout()} className='mb-5 place-self-center justify-center flex flex-col h-12 bg-dteal absolute bottom-10 left-0 right-0'>
      <FontAwesomeIcon  color='white' className='fa-md' icon={faArrowLeft}/>
      </div>
    </div>
  )
}

export default SideBar