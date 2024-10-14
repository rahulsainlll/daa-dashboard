import EventCarousel from '@/components/EventCarousel';
import Memories from '@/components/Memories';
import Nav from '@/components/Nav';
import Sidebar from '@/components/Sidebar';
import UnivInfo from '@/components/UnivInfo';
import { Carousel } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Use axios or fetch to make API requests

const Main = () => {
    const [open, setOpen] = useState(false);
    const [featuredEvents, setFeaturedEvents] = useState([]);

    // Fetch the featured events from the backend
    useEffect(() => {
        const fetchFeaturedEvents = async () => {
            try {
                const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/event/featured'); // Assuming this is your API endpoint
                setFeaturedEvents(response.data.events);
            } catch (err) {
                console.error("Error fetching featured events", err);
            }
        };

        fetchFeaturedEvents();
    }, []);

    return (
        <div>
          
           <Sidebar className="z-10" open={open} setOpen={setOpen} />
           
            
            
            <div
                className={`transition-all duration-300 ${open ? "md:ml-[16.5rem]  w-[40%] md:w-[80.2%]" : "mx-2 lg:mx-0 md:w-[93%] lg:ml-24 mr-8"} md:w-[83.100%] w-[95.5%]`}
            >
                <Nav />
                <UnivInfo />
                <div className="justify-between w-full gap-4 mt-4 space-y-4 lg:flex lg:space-y-0 h-96 px- mb-72 lg:mb-0">
                    <div className="lg:w-full h-64 lg:h-full rounded-[2rem] overflow-hidden">
                        <Carousel slide={true} slideInterval={1000} className=''>
                            {featuredEvents.map(event => (
                                <img key={event._id} src={event.imageUrl} alt={event.name} />
                            ))}
                        </Carousel>
                    </div>
                    <EventCarousel />
                </div>
                <div className="justify-between gap-4 my-4 space-y-4 lg:flex h- lg:space-y-0">
                    <Memories />
                    <img src="./005.jpg" alt="" className=' lg:w-1/3 rounded-[2rem]' />
                </div>
            </div>
        </div>
    );
};

export default Main;
