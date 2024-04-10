import React from 'react';
import './Footer.css';
import LogoMugether from '../../assets/LogoMugether.png'

function Footer() {
    return (


        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src={LogoMugether} width={170} height={170}/>
                        <h5>เกี่ยวกับเรา </h5>
                        <p>Mugether คือเว็บไซต์ที่เน้นการช่วยให้ผู้เริ่มต้นในการผจญภัยของสายมูได้ใช้หาข้อมูลอย่างสะดวกสบาย และให้ข้อมูลที่ครอบคลุมเกี่ยวกับสถานที่และเนื้อหาที่เกี่ยวข้องกับสายมูทั้งหมด เพื่อให้ประสบการณ์การเดินทางของพวกเขาเป็นประสบการณ์ที่น่าจดจำและเต็มไปด้วยความรู้สึกดีตลอดกาล.</p>
                    </div>
                    <div className="Text col-md-6">
                        <h5>ติดต่อเรา</h5>
                        <ul className="list-unstyled">
                            <li>Email:  Mugether_Official@gmail.com</li>
                            <li>Address:  มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p className="text-center">Copyright &copy; 2024 Mugether มูไปด้วยกัน.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        
    );
}

export default Footer;
