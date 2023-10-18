import React, { useEffect, useState } from 'react'
import axios from 'axios'


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export default function Nearby({Muplace_name}) {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1024 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const [nearby, Setnearby] = useState({
        travel: []
    })



    useEffect(() => {
        axios.get(`http://localhost:5353/muplace/nearby/multiple/${Muplace_name}`)
        .then(res => Setnearby(res.data))
        .catch(err => alert(err))
    }, [nearby])


    return (
        <div>
            <h2>สถานที่ท่องเที่ยวใกล้เคียง</h2>

            <Carousel responsive={responsive}>

                {nearby.travel.map((data, index) => {
                    return (
                        <div className='Card'>
                            <img style={{borderRadius:10}} height={200} width={200} src={`http://localhost:5353/image/nearby/travel/${data.name}/1`} alt={data.name} />
                            <br/><br/>
                            <h6><b>{data.name}</b></h6>
                            <p className='detail'>{data.address}</p>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}
