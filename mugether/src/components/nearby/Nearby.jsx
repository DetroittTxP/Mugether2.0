import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Nearby.css'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { IoIosStar } from 'react-icons/io'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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

   
    const [nearby, Setnearby] = useState([])
    const [open, setOpen] = useState(false);
    const [imageinfo, Setimageinfo] = useState({ key: '', name: '' })
    const [index, setIndex] = useState(0);
    const updateIndex = ({ index: current }) =>  setIndex(current);

    useEffect(() => {
        axios.get(`http://localhost:5353/nearby/multiple/${Muplace_name}`)
            .then(res => {
              
                Setnearby([
                    {
                        key: 'travel',
                        type: 'สถานที่ท่องเที่ยวใกล้เคียง',
                        data: res.data.travel
                    },
                    {
                        key: 'food',
                        type: 'ร้านอาหารใกล้เคียง',
                        data: res.data.food
                    },
                    {
                        key: 'hotel',
                        type: 'โรงเเรมใกล้เคียง',
                        data: res.data.hotel
                    }
                ])
            })
            .catch(err => alert(err))
    }, [nearby])
    return (
        <div>

            {nearby.map((data) => (
                <>
                    <h2>{data.type}</h2>

                    <Carousel responsive={responsive}>
                        {data.data.map((e) => (
                            <div className='Card'>
                                <img onClick={() => {
                                    setOpen(true)
                                    Setimageinfo({
                                        key:data.key,
                                        name:e.name
                                    })
                                }} height={200} width={200} src={`http://localhost:5353/image/nearby/${data.key}/${e.name}/1`} alt={data.name} />
                                <br /><br />
                                <h6><b>{e.name}</b></h6>
                                <p><IoIosStar /> {e.rating}</p>
                                <p className='detail'>{e.address}</p>
                                <br /><br />{e.distance_to_mu} จากสถานที่มู<br />


                            </div>
                        ))}
                    </Carousel>
                    <br />
                    <hr />


                </>
            ))}

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[
                    { src: `http://localhost:5353/image/nearby/${imageinfo.key}/${imageinfo.name}/1` },
                    { src: `http://localhost:5353/image/nearby/${imageinfo.key}/${imageinfo.name}/2` },
                    { src: `http://localhost:5353/image/nearby/${imageinfo.key}/${imageinfo.name}/3` },
                ]}
                index={index}
                on={{ view: updateIndex }}
            />


            {/* <h2>สถานที่ท่องเที่ยวใกล้เคียง</h2>
        
            <Carousel responsive={responsive}>

                {nearby.travel.map((data, index) => {
                    return (
                        <div className='Card'>
                            <img style={{borderRadius:20}}  height={200} width={200} src={`http://localhost:5353/image/nearby/travel/${data.name}/1`} alt={data.name} />
                            <br/><br/>
                            <h6><b>{data.name}</b></h6>
                            <p className='detail'>{data.address}</p>
                        </div>
                    )
                })}


            </Carousel> */}
        </div>
    )
}
