import React,{useEffect,useState} from 'react'
import axios from 'axios'


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export default function Nearby() {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    const [nearby,Setnearby] = useState([{
        travel:[]
    }])



  useEffect(()=>{
    axios.get(`http://localhost:5353/image/nearby/travel//4`)
  },[])


  return (
    <div>
        <h2>สถานที่ท่องเที่ยวใกล้เคียง</h2>

        <Carousel responsive={responsive}>
                
        </Carousel>
    </div>
  )
}
