import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import './SildeTour.scss'
import Item from '../Items/Item';
import { Empty } from 'antd';

const SildeTour = (props) => {
    const { tours } = props

    const settings = {
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 1000,
        cssEase: "linear"
    };
    return (
        <div className='slide-newproduct'>
            <Slider {...settings}>
                {tours && tours?.length > 0 ? tours.map((item, index) => {
                    return (
                        <>
                            <div className='p-1'>
                                <Item
                                    key={index}
                                    data={item}
                                />
                            </div>
                        </>
                    )
                }) : <Empty />}
            </Slider>
        </div>
    )
}

export default SildeTour