import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row, Col, Container, Button, Card } from "react-bootstrap";
import { Muplace_Context } from "../../context/MuContext";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import SwalLoading from "../util/SwalLoading";
import './listitem.css'
export default function Listitem({ SelectedMuType, SelectedMuplace, favstatus }) {
  const navigate = useNavigate();
  const usrID = localStorage.getItem('usr_id')
  const [List_Of_Mu, Setlistofmu] = useState([]);
  const [HeartCheck, Setheartcheck] = useState([]);
  const { muplace } = useContext(Muplace_Context);

  useEffect(() => {
    let usr_id = localStorage.getItem('usr_id')

    if (usr_id) {
      axios.get(`http://localhost:5353/user/fav/${usrID}`)
        .then(res => {
          Setheartcheck(res.data.favorite_muplace)
        })
        .catch(err => alert(err))
    }

    axios
      .get("http://localhost:5353/muplace/mudata")
      .then((res) => {
        Setlistofmu(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    Setlistofmu(muplace);
    if (!favstatus) {
      Setlistofmu(prev => prev.filter((data) => data.type.includes(SelectedMuType)));
    }
  }, [SelectedMuType, favstatus, muplace]);

  useEffect(() => {
    if (favstatus) {
      Setlistofmu(prev => prev.filter(data => HeartCheck.includes(data.name)));
    } else {
      Setlistofmu(muplace);
    }
  }, [favstatus, HeartCheck, muplace]);

  const handleHeart = async (name) => {
    let updateFav;
    Setheartcheck(prev => {
      if (prev.includes(name)) {
        updateFav = prev.filter(item => item !== name);
        return updateFav;
      } else {
        updateFav = [...prev, name];
        return updateFav;
      }
    });

    try {
      SwalLoading();
      let { data } = await axios.put('http://localhost:5353/user/add/favorite', { updateFav, usrID })
      console.log(data);
      if (data.status === 'ok') {
        Swal.close();
      }
    } catch (err) {
      Swal.fire({ icon: 'error', text: err })
    }
  }

  return (
    <Container>
      <Row xs={1} md={2} lg={4} className="g-4">
        {List_Of_Mu.filter((data, i) => data.name !== "วัดดาวดึงษาราม")
          .sort((a, b) => a.name.localeCompare(b.name, "th"))
          .map((data, index) => (
            <Col key={data.name}>
              <Card style={{ height: "100%" , borderRadius: "15px", cursor: "pointer"}}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5353/image/mu/${data.name}/7`}
                  alt={data.name}
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
                  style={{ height: "300px", objectFit: "cover", borderRadius: "15px"}}
                />
                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Text>
                    <FaMapMarkerAlt style={{ marginRight: "5px" }} />
                    {data.address}
                  </Card.Text>
                  {usrID && (
                    <div className="fav-icon">
                    <Button variant="link" onClick={() => handleHeart(data.name)}>
                      <FaHeart
                        style={{
                          color: HeartCheck.includes(data.name) ? "red" : "white",
                          cursor: "pointer",
                          fontSize: "24px",
                        }}
                      />
                    </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
