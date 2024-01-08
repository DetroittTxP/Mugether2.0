import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function List_guide() {

    const [guidedata, Setguidedata] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5353/guide/list-guide')
            .then(res => Setguidedata(res.data))
            .catch(err => alert(err))
    }, [])

    return (
        <div>
            <h2 style={{ textDecoration: 'underline' }}>CHOOSE YOUR GUIDE</h2>

            {guidedata.map(data => (
                <div>
                    <img src={`http://localhost:5353/image/guide/profile/${data.username}/${data.profile_pic}`} height={100} width={100} />
                    <br/>
                    <b>นาย {data.firstname} {data.lastname}</b>
                </div>

            ))}
            {/* WAIT FOR CSS */}

        </div>
    )
}
