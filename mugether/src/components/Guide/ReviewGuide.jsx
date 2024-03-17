import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Button, Input } from 'antd'
import { Form, Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ButtonBo from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel';
import { Muplace_Context } from '../../context/MuContext';

export default function ReviewGuide({ reviewdata }) {
    const {SERVER_URL} = useContext(Muplace_Context)
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;
    const [detail, Setdetail] = useState(reviewdata);
    const [addreview, Setaddreview] = useState(false);

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = detail.slice(indexOfFirstReview, indexOfLastReview);
    const totalReviews = detail.length;
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };




    const [isModalOpen, setIsModalOpen] = useState(true);
    const [currentImage, setCurrentImage] = useState('');

    const check_finish = (isFinish) => {
        Setaddreview(isFinish)
      }

    const write_review=()=>{  

        let user = localStorage.getItem('usr') 
    
        if(user && addreview)
        {
          return Setaddreview(false)
        }
        return user ? Setaddreview(true) : Swal.fire('Login first');
      }


    const sumreview = () => {
        let sum = 0;
        for (let i = 0; i < detail.length; i++) {
            sum += detail[i].score
        }

        return sum / detail.length
    }

    const renderPageNumbers = totalPages => {
        let pages = [];
        const maxVisiblePages = 5;
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        className={`page-number ${currentPage === i ? "active" : ""}`}
                        onClick={() => handlePageClick(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            const startPage = Math.max(currentPage - 2, 1);
            const endPage = Math.min(currentPage + 2, totalPages);
            if (startPage > 1) {
                pages.push(
                    <IconButton key="prev" onClick={() => handlePageClick(currentPage - 1)}>
                        <ChevronLeftIcon />
                    </IconButton>
                );
            }
            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <button
                        key={i}
                        className={`page-number ${currentPage === i ? "active" : ""}`}
                        onClick={() => handlePageClick(i)}
                    >
                        {i}
                    </button>
                );
            }
            if (endPage < totalPages) {
                pages.push(
                    <IconButton key="next" onClick={() => handlePageClick(currentPage + 1)}>
                        <ChevronRightIcon />
                    </IconButton>
                );
            }
        }
        return (
            <div className="carousel-pagination">
                {pages}
            </div>
        );
    };


    let Reviewd = (
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ color: '#faaf00', fontSize: '40px' }}>★</span>
                <span style={{ margin: '0 0.5rem', fontSize: '30px' }}>{sumreview().toFixed(2)} • {detail.length} รีวิว</span>
            </div>
        </div>
    )

    const closeModal = () => {
        setIsModalOpen(true);
        document.querySelector('.modal').style.display = 'none';
    };

    const renderModal = () => {
        if (!isModalOpen) return null;

        return (
            <div className="modal" onClick={closeModal}>
                <span className="close" onClick={closeModal}>&times;</span>
                <img className="modal-content" src={currentImage} alt="Enlarged review" />
            </div>
        );
    };


    return (
        <div className="review-container">
            {detail.length === 0 ? <h2>ไม่มีรีวิวขณะนี้</h2> : Reviewd}
            <>
                {currentReviews.map((data, index) => (
                    <>
                        <div key={index} className="review-item">
                            <img className="avatar" src={`${SERVER_URL}/image/user/profile/${data.username}`} alt={data.username} />
                            <div className="review-content">
                                <h4 className="username">{data.username}</h4>
                                <Rating className="rating" readOnly name='read-only' value={data.score} />
                                <p className="review-text">{data.detail}</p>
                            </div>
                        </div>
                    </>
                ))}
            </>



            {<div className='button-review'>
                <Button onClick={write_review}>
                    <b>{addreview ? "ย้อนกลับ" : "เขียนรีวิว"}</b>
                </Button>
            </div>}
        </div>
    )
}
