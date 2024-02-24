import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';
import { MdOutlineTempleBuddhist } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import { RiHotelBedFill } from "react-icons/ri";
import { MdOutlineTravelExplore } from "react-icons/md";

import './Map.css'
import { DivIcon, Icon } from 'leaflet'


export default function Map() {
  const [muplace_name, Setmuplace_name] = useState(localStorage.getItem('showmap'))
  const [markers, setMarkers] = useState({});
  const [showmap, Setshowmap] = useState(false);

  const templeIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/898/898151.png',
    iconSize: [38, 38]
  });

  const foodIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/685/685352.png',
    iconSize: [20, 20]
  })

  const hotelIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/489/489870.png',
    iconSize: [20, 20]
  })


  const travelIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/5802/5802193.png',
    iconSize: [20, 20]
  })




  useEffect(() => {

    axios.get(`http://localhost:5353/latlong/mu/nearby/${muplace_name}`)
      .then(res => {
        setMarkers(res.data)
        Setshowmap(true);
      })
      .catch(err => alert(err))


  }, [muplace_name])




  return (
    <div>
      {showmap &&
        <MapContainer center={markers.muplace_latlong.location} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker icon={templeIcon} position={markers.muplace_latlong.location} >
            <Popup>{markers.muplace_latlong.name}</Popup>
          </Marker>

          {markers.hotel_latlong.map((data, index) => (
            <Marker key={index + 100} icon={hotelIcon} position={data.location}>
              <Popup>
                <p>{data.name}</p>
                <p>ระยะทางจากที่มู {data.distance_to_mu}</p>
              </Popup>
            </Marker>
          ))}



          {markers.food_latlong.map((data, index) => (
            <Marker key={index} icon={foodIcon} position={data.location}>
              <Popup>
                <p>{data.name}</p>
                <p>ระยะทางจากที่มู {data.distance_to_mu}</p>
              </Popup>
            </Marker>
          ))}

          {markers.travel_latlong.map((data, index) => (
            <Marker key={index + 1000} icon={travelIcon} position={data.location}>
              <Popup>
                <p>{data.name}</p>
                <p>ระยะทางจากที่มู {data.distance_to_mu}</p>
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      }
    </div>
  )
}
