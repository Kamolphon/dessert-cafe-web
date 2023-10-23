import { Link } from 'react-router-dom'
function Navbar() {

    return (
        <div className='navbar-bg z-50 text-sm py-3 flex items-center justify-between drop-shadow-xl 2xl:text-2xl md:py-4 2xl:py-5'>
            <h1 className='ml-3'>Dolce Vita Dessert Café</h1>
            <div className=''>
                <Link to={`/`} className='navbar md:mr-6 sm:mr-3'>
                    Home
                </Link>
                <Link to={`/about`} className='navbar md:mr-6 sm:mr-3'>
                    About
                </Link>
            </div>
        </div>
    )
}


export default Navbar