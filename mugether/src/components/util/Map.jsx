import React, { useEffect, useState, useContext } from 'react'
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import axios from 'axios';
import MarkerClusterGroup from "react-leaflet-cluster";
import Image from 'react-bootstrap/Image'
import { Carousel,Row,Col } from 'react-bootstrap'
import './Map.css'
import { DivIcon, Icon } from 'leaflet'
import { Muplace_Context } from '../../context/MuContext';
import Gps1 from '../../assets/gps.png'
import location1 from '../../assets/location.png'
import Gps22 from '../../assets/gps2222.png'
import location22 from '../../assets/location-pin.png'
import ShareButton from "../layout/ShareButton";

export default function Map() {
  const [muplace_name, Setmuplace_name] = useState(localStorage.getItem('showmap'))
  const [markers, setMarkers] = useState({});
  const [showmap, Setshowmap] = useState(false);
  const [popup, Setpopup] = useState(false)
  const { SERVER_URL } = useContext(Muplace_Context)
  const [targethotel,settargethotel] = useState(null)
  const [targetmuplace,settargetmuplace] = useState(null)
  const [targetfood,settargetfood] = useState(null)
  const [targettravel,settargettravel] = useState(null)
  

  
  const templeIcon = new Icon({
    iconUrl: Gps1,
    iconSize: [45, 45]
  });

  const foodIcon = new Icon({
    iconUrl: location1,
    iconSize: [45, 45]
  })

  const hotelIcon = new Icon({
    iconUrl: Gps22,
    iconSize: [45, 45]
  })


  const travelIcon = new Icon({
    iconUrl: location22,
    iconSize: [45, 45]
  })

  useEffect(() => {

    axios.get(`${SERVER_URL}/latlong/mu/nearby/${muplace_name}`)
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
      <br/>
      <Row className="header-row">
        <Col className="header-title">
        <h1><b>เเผนที่</b></h1>
        </Col>
        <Col xs="auto" >

          <ShareButton  />
        </Col>
      </Row>

      {showmap &&
        <MapContainer center={markers.muplace_latlong.location} zoom={13} scrollWheelZoom={true} minZoom={5} maxZoom={18}>
          
          <div className='info-marker'>
            <div >
              <Image src={Gps1} width={35}  />
              <span>สถานที่มู</span>
            </div>

            <div >
            <Image src={location1} width={35}  />
              <span>ร้านอาหาร</span>
            </div>
            <div >
            <Image src={Gps22} width={35}  />
              <span>โรงเเรม</span>
            </div>

            <div >
            <Image src={location22} width={35}  />
              <span>สถานที่ท่องเที่ยว</span>
            </div>
          </div>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker eventHandlers={{ mouseover: onMouseover, mouseout: onMouseout }}
            icon={templeIcon} position={markers.muplace_latlong.location} >
            <Popup >
              {markers.muplace_latlong.name}
              <br />
              <br />
              <Image rounded width={250} height={250} src={`${SERVER_URL}/image/mu/${markers.muplace_latlong.name}/1`} />


            </Popup>
          </Marker>

          <MarkerClusterGroup >
            {markers.hotel_latlong.map((data, index) => (
              <Marker eventHandlers={{ mouseover: onMouseover, mouseout: onMouseout }} key={index + 100} icon={hotelIcon} position={data.location}>
                <Popup>
                  <p>{data.name}</p>
                  <Image rounded width={250} height={250} src={`${SERVER_URL}/image/nearby/hotel/${data.name}/1`} />
                  <p>ระยะทางจากที่มู {data.distance_to_mu}</p>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>


          <MarkerClusterGroup>
            {markers.food_latlong.map((data, index) => (
              <Marker eventHandlers={{ mouseover: onMouseover, mouseout: onMouseout }} key={index} icon={foodIcon} position={data.location}>
                <Popup>
                  <p>{data.name}</p>
                  <Image rounded width={250} height={250} src={`${SERVER_URL}/image/nearby/food/${data.name}/1`} />
                  <p>ระยะทางจากที่มู {data.distance_to_mu}</p>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          <MarkerClusterGroup>
            {markers.travel_latlong.map((data, index) => (
              <Marker eventHandlers={{ mouseover: onMouseover, mouseout: onMouseout }} key={index + 1000} icon={travelIcon} position={data.location}>
                <Popup>
                  <p>{data.name}</p>
                  <Image rounded width={250} height={250} src={`${SERVER_URL}/image/nearby/travel/${data.name}/1`} />
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
