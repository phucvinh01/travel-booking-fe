import React from 'react'
import Slider from "react-slick";
import './SildeTour.scss'
import { useEffect } from 'react';
import Axios from '../../Axios/Axios'
import { useState } from 'react';

const SlideImgTour = (props) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6
    };

    const { id } = props
    const [img, setImg] = useState([])

    const getImg = async (id) => {
        let imgList = await Axios.get(`/DanhMucHinh/get-all-danh-muc-hinh-tour?maTour=${id}`)
        if (imgList) {
            setImg(imgList)
        }
    }

    useEffect(() => {
        getImg(id)
    }, [id])

    return (
        <>
            <div className='slide-newproduct'>
                <Slider {...settings}>
                    {
                        img && img?.length > 0 && img.map((item, index) => {
                            return (
                                <>
                                    <div style={{ width: 30 }} key={index}>
                                        <img width={100} src={`..//..//..//src/assets/Images/${item.fileName}`}></img>
                                    </div>
                                </>
                            )
                        })
                    }
                </Slider>
            </div>
        </>
    )
}

export default SlideImgTour