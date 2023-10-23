import { Link } from 'react-router-dom';
import { fetchRestaurantData } from './composable/getRestaurant'
import { Restaurant } from './interface/interface';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Loading from './components/Views/Loading';
import CallStaffBtn from './components/Button/CallStaffBtn';
function App() {
  const [restaurant, setRestaurant] = useState<Restaurant[] | null>(null);
  useEffect(() => {
    fetchRestaurantData()
      .then((data) => {
        setRestaurant(data)
      })
      .catch((error) => console.log("Error", error));
  }, []);

  if (restaurant === null) {
    return (
      <div>
        <Loading/>
      </div>
    )
  }

  return (
    <div className='md:w-full w-screen'>
      <Navbar />
      <div className='flex justify-center items-center md:mt-24 mt-12 mx-20 animate__animated animate__fadeIn absolute top-0 bottom-0 left-0 right-0 -z-10'>
        {
          restaurant.map(restaurant => (
            <div key={restaurant.restaurantId} className='flex flex-col justify-center items-center md:flex-row'>
              <div className='items-center md:mb-10 mb-8 mx-8'>
                <img className='rounded-full ring ring-pink-500 ring-offset-8' src={restaurant.coverImage} />
              </div>
              <div className='mx-8'>
                <div className='md:mb-10 mb-5'>
                  <p className='text-gradient md:text-6xl text-3xl'>{restaurant.restaurantName}</p>
                </div>
                <div>
                  <div className='md:mb-10 mb-5 md:text-xl text-sm font-light'>
                    <p>Life is a little sweeter when you can savor a café that pampers you with the indulgence of ice cream, the delight of cake, and the coolness of milkshakes. </p>
                  </div>
                  <div className='text-gradient md:text-2xl text-lg'>
                    <div className='md:mb-2'>
                      <p>{"ice cream".toUpperCase()}</p>
                    </div>
                    <div className='md:mb-2'>
                      <p>{"cake".toUpperCase()}</p>
                    </div>
                    <div className='md:mb-10 mb-5'>
                      <p>{"milkshake".toUpperCase()}</p>
                    </div>
                  </div>
                  <div className='flex md:justify-start justify-center space-x-5 mb-8'>
                    <button className='button-firstpage w-32 md:h-12 md:text-lg'>
                      <Link to="/allmenu">Menu</Link>
                    </button>       
                      <CallStaffBtn/>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default App