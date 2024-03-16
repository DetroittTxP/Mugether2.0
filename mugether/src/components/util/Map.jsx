import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';
import MarkerClusterGroup from "react-leaflet-cluster";
import Image from 'react-bootstrap/Image'
import { Carousel } from 'react-bootstrap'
import './Map.css'
import { DivIcon, Icon } from 'leaflet'


export default function Map() {
  const [muplace_name, Setmuplace_name] = useState(localStorage.getItem('showmap'))
  const [markers, setMarkers] = useState({});
  const [showmap, Setshowmap] = useState(false);
  const [popup, Setpopup] = useState(false)

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


  const onMouseover = (e) => e.target.openPopup();
  const onMouseout = (e) => e.target.closePopup();



  return (
    <div>
      <h1><b>เเผนที่</b></h1>
      {showmap &&
        <MapContainer center={markers.muplace_latlong.location} zoom={13} scrollWheelZoom={true} minZoom={5} maxZoom={18}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker eventHandlers={{mouseover:onMouseover,mouseout:onMouseout}} 
          icon={templeIcon} position={markers.muplace_latlong.location} >
            <Popup >
              {markers.muplace_latlong.name}
              <br />
              <br />
              <Image rounded width={250} height={250} src={`http://localhost:5353/image/mu/${markers.muplace_latlong.name}/1`} />


            </Popup>
          </Marker>

          <MarkerClusterGroup >
            {markers.hotel_latlong.map((data, index) => (
              <Marker eventHandlers={{mouseover:onMouseover,mouseout:onMouseout}}  key={index + 100} icon={hotelIcon} position={data.location}>
                <Popup>
                  <p>{data.name}</p>
                  <Image rounded width={250} height={250} src={`http://localhost:5353/image/nearby/hotel/${data.name}/1`} />
                  <p>ระยะทางจากที่มู {data.distance_to_mu}</p>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>


          <MarkerClusterGroup>
            {markers.food_latlong.map((data, index) => (
              <Marker eventHandlers={{mouseover:onMouseover,mouseout:onMouseout}}  key={index} icon={foodIcon} position={data.location}>
                <Popup>
                  <p>{data.name}</p>
                  <Image rounded width={250} height={250} src={`http://localhost:5353/image/nearby/food/${data.name}/1`} />
                  <p>ระยะทางจากที่มู {data.distance_to_mu}</p>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          <MarkerClusterGroup>
            {markers.travel_latlong.map((data, index) => (
              <Marker eventHandlers={{mouseover:onMouseover,mouseout:onMouseout}}  key={index + 1000} icon={travelIcon} position={data.location}>
                <Popup>
                  <p>{data.name}</p>
                  <Image rounded width={250} height={250} src={`http://localhost:5353/image/nearby/travel/${data.name}/1`} />
                  <p>ระยะทางจากที่มู {data.distance_to_mu}</p>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

        </MapContainer>
      }
    </div>
  )
}
