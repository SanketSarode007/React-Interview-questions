import React from 'react';
import Posts from './Components/Posts';
import Notifiy from './Components/toast/notification/Notify';
import  {CinemaSeatBooking}  from './Components/CinemaSeatBooking/CinemaSeatBooking';

const App: React.FC = () => {

  const layout = {
    rows: 8,
    seatPerRows: 12,
    aislePosition: 5
  }

  const seatTypes = {
    regular: { name: 'Regular', price: 150, rows: [0, 1, 2] },
    premium: { name: 'Premium', price: 250, rows: [3, 4, 5] },
    vip: { name: 'VIP', price: 350, rows: [6, 7] }
  }

  return (
    // <div className='flex justify-center items-center h-screen'>
    //   {/* <Posts/> */}
      // <Notifiy id='1' title='Title' description='Description'/>
    // </div>
    // <div></div>
   
    <CinemaSeatBooking 
    layout={layout} 
    seatTypes={seatTypes} 
    bookedSeats={[]} 
    currency=''
    onBookingComplete={(booking) => {console.log(booking)}}
    title='Cinema Hall Booking'
    Subtitle='Select Your prefered seats'
    />
  );
};

export default App;