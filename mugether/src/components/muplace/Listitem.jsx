import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row, Col, Container, Button, Carousel, Card } from "react-bootstrap";
import { Muplace_Context } from "../../context/MuContext";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


import { Image } from 'react-bootstrap'
import SwalLoading from "../util/SwalLoading";


export default function Listitem({ SelectedMuType, SelectedMuplace, favstatus }) {
  const navigate = useNavigate();
  const usrID = localStorage.getItem('usr_id')
  const [List_Of_Mu, Setlistofmu] = useState([]);
  const [HeartCheck, Setheartcheck] = useState([]);
  const { muplace } = useContext(Muplace_Context);

  const carouselImg = [];

  useEffect(() => {
    let usr_id = localStorage.getItem('usr_id')

    if (usr_id) {
      axios.get(`http://localhost:5353/user/fav/${usrID}`)
        .then(res => {
          Setheartcheck(res.data.favorite_muplace)

          console.log(res.data);
        })
        .catch(err => alert(err))
    }

    axios
      .get("http://localhost:5353/muplace/mudata")
      .then((res) => {
        Setlistofmu(res.data);
        console.log(res.data);

      })
      .catch((err) => alert(err));


  }, []);

  useEffect(() => {
    Setlistofmu(muplace);

    let fav = JSON.parse(localStorage.getItem('fav'));
    if (fav) {
      Setlistofmu((prev) =>
        prev.filter((data) => data.type.includes(SelectedMuType) && HeartCheck.includes(data.name))
      );
    }else{
      Setlistofmu((prev) =>
      prev.filter((data) => data.type.includes(SelectedMuType))
    );
    }

  }, [SelectedMuType]);


  useEffect(() => {
    
    if (favstatus) {
      Setlistofmu(prev => prev.filter(data => HeartCheck.includes(data.name)))
    }
    else{
       Setlistofmu(muplace)
    }
  }, [favstatus, HeartCheck])




  const handleHeart = async (name) => {
    let updateFav;
    Setheartcheck(prev => {
      if (prev.includes(name)) {

        updateFav = prev.filter(item => item !== name);;
        return updateFav;
      }
      else {
        updateFav = [...prev, name];
        return updateFav;
      }
    })

    setTimeout(async () => {
      try {
        SwalLoading();
        let { data } = await axios.put('http://localhost:5353/user/add/favorite', { updateFav, usrID })
        if (data.status === 'ok') {
          Swal.close();
        }
      }
      catch (err) {
        Swal.fire({ icon: 'error', text: err })
      }
    }, 0)
  }



  return (
    <Container >
      <Row className="g-5" >

        {List_Of_Mu.filter((data, i) => data.name !== "วัดดาวดึงษาราม")
          .sort((a, b) => a.name.localeCompare(b.name, "th"))
          .map((data, index) => {


            return (
              <Col xs={6} md={4} lg={3} key={data.name}>

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
                    {usrID && <FaHeart

                      onClick={() => {
                        handleHeart(data.name);
                      }}
                      style={{
                        color: HeartCheck.includes(data.name) ? "red" : "white",
                        cursor: "pointer",
                        fontSize: "24px",
                      }}
                    />}
                  </div>



                  <Image
                    onClick={() => {
                      SelectedMuplace(data.name);
                      localStorage.setItem('showmap', data.name)
                      navigate("/mudetail");
                      Swal.fire({
                        title: 'Loading...',
                        html: 'Please wait',
                        timer: 1800,
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

