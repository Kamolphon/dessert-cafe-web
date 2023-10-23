import Navbar from '../Navbar/Navbar';
import 'animate.css';

function About() {
  return (
    <div className='h-full w-full'>
        <Navbar />
        <div className='viewnavpage h-full animate__animated animate__fadeIn md:absolute'>
        <div className='flex flex-col md:w-1/2 w-full mx-5 md:mx-0 md:mt-0'>
          <div>
            <h1 className='about-cafe md:mb-5 md:text-5xl'>About Our Café</h1>
          </div>
          <div className='items-center'>
            <p className='toppic-about md:text-2xl'>Ice Cream</p>
            <p className='about-details'>It all started with our love for ice cream. We set out to craft the creamiest, most flavorsome ice creams in town. Using premium ingredients and unique recipes, our ice cream quickly became a local favorite.</p>
          </div>
          <div className='items-center'>
            <p className='toppic-about md:text-2xl'>Cake</p>
            <p className='about-details'>As our cafe grew, so did our passion for creating. Our bakers began making cakes that were not just desserts but works of art. Each slice is a masterpiece, carefully baked and designed to celebrate life's moments, big and small.</p>
          </div>
          <div className='items-center'>
            <p className='toppic-about md:text-2xl'>Milkshake</p>
            <p className='about-details'>Our journey wouldn't be complete without our incredible milkshakes. They're more than just drinks; they're an explosion of flavors. From classic chocolate to extravagant fruit combinations, our milkshakes are pure magic in a glass.</p>
          </div>
        </div>
        </div>
    </div >
  )
}

export default About