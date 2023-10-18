import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Nearby.css'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export default function Nearby({ Muplace_name }) {

    const responsive = {
        superLargeDesktop: {
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

    const [nearby, Setnearby] = useState([]);



    useEffect(() => {
        axios.get(`http://localhost:5353/muplace/nearby/multiple/${Muplace_name}`)
            .then(res => {
                Setnearby([
                    {
                        typeNearby: "สถานที่ท่องเที่ยวใกล้เคียง",
                        typeData: res.data.travel,
                        key:"travel"
                    },
                    {
                        typeNearby: "ร้านอาหารใกล้เคียง",
                        typeData: res.data.food,
                        key:"food"
                    },
                    {
                        typeNearby: "โรงเเรมใกล้เคียง",
                        typeData: res.data.hotel,
                        key:"hotel"
                    }
                ]
                )
            })
            .catch(err => alert(err))
    }, [nearby])


    return (
        <div>

            {nearby.map((data => (
                <>
                    <h2>{data.typeNearby}</h2>

                    <Carousel responsive={responsive}>
                        {data.typeData.map(e => (
                            <>
                                <div className='Card'  >
                                    <img style={{ borderRadius: 10 }} height={200} width={200} src={`http://localhost:5353/image/nearby/${data.key}/${e.name}/1`} alt={data.name} />
                                    <br /><br />
                                    <h6><b>{e.name}</b></h6>
                                    <p className='detail'>{e.address}</p>
                                </div>
                                <br/>
                                <hr/>
                            </>
                        ))}
                    </Carousel>
                </>
            )))}

            {/* <Carousel  responsive={responsive}>

                {nearby.travel.map((data, index) => {
                    return (
                        <div className='Card'  >
                            <img  style={{borderRadius:10}} height={200} width={200} src={`http://localhost:5353/image/nearby/travel/${data.name}/1`} alt={data.name} />
                            <br/><br/>
                            <h6><b>{data.name}</b></h6>
                            <p className='detail'>{data.address}</p>
                        </div>
                    )
                })}
            </Carousel>

            <br/><hr/> */}
        </div>
    )
}
