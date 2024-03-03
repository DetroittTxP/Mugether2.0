import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Muplace_Context } from "../context/MuContext";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import { Image } from 'react-bootstrap'
import SwalLoading from "./SwalLoading";

export default function Listitem({ SelectedMuType, SelectedMuplace }) {
  const navigate = useNavigate();
  const usrID = localStorage.getItem('usr_id')
  const [List_Of_Mu, Setlistofmu] = useState([]);
  const [HeartCheck, Setheartcheck] = useState([]);
  const { muplace } = useContext(Muplace_Context);


  useEffect(() => {
    let usr_id = localStorage.getItem('usr_id')

    if(usr_id)
    {
        axios.get(`http://localhost:5353/user/fav/${usrID}`)
       .then(res => {
        Setheartcheck(res.data.favorite_muplace)
        console.log(res.data);
       })
       .catch(err => alert(err))       
    }

    axios
      .get("http://localhost:5353/muplace/mudata")
      .then((res) => Setlistofmu(res.data))
      .catch((err) => alert(err));
    

  }, []);

  useEffect(() => {
    Setlistofmu(muplace);
    Setlistofmu((prev) =>
      prev.filter((data) => data.type.includes(SelectedMuType))
    );
  }, [SelectedMuType]);


  const handleHeart=async (name)=>{
    if (HeartCheck.includes(name)) {
      Setheartcheck((prev) => prev.filter((item) => item !== name));
    } else {
      Setheartcheck((prev) => [...prev, name]);
    }
  }

  const addFav_toDB=async( fav )=>{
     let add_fav = await axios.post('http://localhost:5353/user/add/favorite',
          {
            id: localStorage.getItem('usr_id'),
            favorite_item: fav
          }
        )
        console.log(add_fav.data);
        return;
  }


  const toggleHeart = async (name) => {


    if (localStorage.getItem("token") !== null) {
     await handleHeart(name)

      try {
        SwalLoading();
        await addFav_toDB(HeartCheck)
        Swal.close();
      }
      catch (err) {
        return Swal.fire(err)
      }
    }
    else {
      Swal.fire("โปรด Login ก่อน");
    }


  };

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Row style={{ justifyContent: "center" }}>
        
        {List_Of_Mu.filter((data) => data.name !== "วัดดาวดึงษาราม")
          .sort((a, b) => a.name.localeCompare(b.name, "th"))
          .map((data, index) => {
            let top = index > 3 ? { marginTop: 100 } : {};

            return (
              <Col style={top} md={3} key={data.name}>
                <a

                  style={{
                    position: "relative",
                    borderRadius: 20,
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      zIndex: 1,
                    }}
                  >
                    <FaHeart
                      onClick={() => {
                        toggleHeart(data.name);
                      }}
                      style={{
                        color: HeartCheck.includes(data.name) ? "red" : "white",
                        cursor: "pointer",
                        fontSize: "24px",
                      }}
                    />
                  </div>



                  <Image

                    onClick={() => {
                      SelectedMuplace(data.name);
                      localStorage.setItem('showmap',data.name)
                      navigate("/mudetail");
                      Swal.fire({
                        title: 'Loading...',
                        html: 'Please wait',
                        timer:1800,
                        timerProgressBar: true,
                        didOpen: () => {
                          Swal.showLoading();
                        },
                      })
                      
                    }}
                    style={{ borderRadius: 20, cursor: 'pointer' }}
                    width={300}
                    height={300}
                    alt={data.name}
                    src={`http://localhost:5353/image/mu/${data.name}/7`}
                    loading="lazy"
                  />

                </a>

                <br />

                <div style={{ fontFamily: "Sarabun" }}>
                  <h5>{data.name}</h5>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaMapMarkerAlt style={{ marginRight: "10px" }} />
                  <span>{data.address}</span>
                </div>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}
