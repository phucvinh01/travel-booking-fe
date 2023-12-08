import React from 'react';
import Search from '../components/Search';
import ListItem from '../components/Items/ListItem';
import { useSelector } from 'react-redux';
import './Home.scss';
import video_1 from '../assets/video-1.mp4'
import SildeTour from '../components/SildeTour';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Tours = () => {
    const tours = useSelector((state) => state.tour.tours.data);

    return (
        <>
            <div>
                <section className='mt-4 container'>
                    <div className='d-flex justify-content-center align-items-center mt-4 background-home'></div>
                    <section className='my-3 container'>
                        <div className='row mx-auto'>
                            <div className='col-lg-4 col-md-12 col-sm-12'>
                                <div className='d-flex align-center gap-3 p-3'>
                                    <img
                                        style={ { width: '50px' } }
                                        src='https://www.ivivu.com/du-lich/content/img/icon-support.svg'></img>
                                    <div>
                                        <p className='m-0'>
                                            <strong>Tư Vấn Chuyên Nghiệp</strong>
                                        </p>
                                        <p className='m-0'>
                                            <small>Hỗ trợ nhiệt tình, chăm sóc chu đáo</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-12 col-sm-12'>
                                <div className='d-flex align-center gap-3 p-3'>
                                    <img
                                        style={ { width: '50px' } }
                                        src='https://www.ivivu.com/du-lich/content/img/icon-location.svg'></img>
                                    <div>
                                        <p className='m-0'>
                                            <strong>Trải Nghiệm Đa Dạng</strong>
                                        </p>
                                        <p className='m-0'>
                                            <small>Chọn tour phù hợp, giá tour hợp lý</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-12 col-sm-12'>
                                <div className='d-flex align-center gap-3 p-3'>
                                    <img
                                        style={ { width: '50px' } }
                                        src='https://www.ivivu.com/du-lich/content/img/icon-payment.svg'></img>
                                    <div>
                                        <p className='m-0'>
                                            <strong>Thanh Toán An Toàn</strong>
                                        </p>
                                        <p className='m-0'>
                                            <small>Linh hoạt, rõ ràng, bảo mật</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className='row'>
                            <div className='col-lg-6 col-md-12 col-sm-12 section-content'>
                                <h1 className='py-4'>
                                    Du lịch mở ra cánh cửa để tạo ra những kỷ niệm với{ ' ' }
                                    <span>chúng tôi</span>{ ' ' }
                                </h1>

                                <p className='mt-2'>
                                    Chào mừng bạn đến với chúng tôi! Tại đây, chúng
                                    tôi cung cấp một trang web đặt tour tuyệt vời để giúp bạn dễ
                                    dàng lựa chọn và đặt các tour du lịch phù hợp với mong muốn
                                    của bạn. Với sự đa dạng về điểm đến và trải nghiệm, chúng tôi
                                    tự hào mang đến cho bạn một bộ sưu tập tour đa dạng từ các địa
                                    điểm hấp dẫn trên khắp thế giới. Chúng tôi cung cấp các tour
                                    du lịch tới các thành phố đẹp, bãi biển tuyệt vời, cảnh quan
                                    hùng vĩ và nền văn hóa đa dạng.
                                </p>
                            </div>
                            <div className='col-lg-6 col-md-12 col-sm-12'>
                                <div className='row p-2'>
                                    <div className='col-lg-4 col-md-4 img-content__left'>
                                        <img src='https://i.pinimg.com/564x/4a/7a/fd/4a7afd6d3bc543e75afbf8df72a94a58.jpg'></img>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-12 video-content'>
                                        <video
                                            controls
                                            src={ video_1 }></video>
                                    </div>
                                    <div className='col-lg-4 col-md-4 img-content__right'>
                                        <img src='https://i.pinimg.com/564x/25/b4/ac/25b4ac5281ea6d6f713d7897bcfa992b.jpg'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <SildeTour tours={ tours && tours.length > 0 && tours?.slice(0, 9) } />
                    <div className='d-flex justify-content-center mt-1'>
                        <Link to={ '/tours' } className='btn btn-outline-light text-dark'>Xem tất cả</Link>
                    </div>
                    <section>
                        <div>
                            <p className='section-content-title m-0'>Những gì bạn tìm kiếm</p>
                            <p className='fw-bolder fs-4'>Những khung cảnh tuyệt vời</p>
                        </div>
                        <div className='row wraper-img'>
                            <img
                                className='rounded-4 p-2 hover-img'
                                src='https://i.pinimg.com/236x/01/d4/d7/01d4d71022b4872125932fe69322f31b.jpg'
                                alt='random-img'></img>
                            <img
                                className='rounded-4 p-2 hover-img'
                                src='https://i.pinimg.com/564x/f2/90/48/f29048ac079dfc1a76bd9ce3b43e39ec.jpg'
                                alt='random-img'></img>
                            <img
                                className='rounded-4 p-2 hover-img'
                                src='https://i.pinimg.com/736x/87/9a/a0/879aa0d98eab8913cdab628e0ba35be7.jpg'
                                alt='random-img'></img>
                            <img
                                className='rounded-4 p-2 hover-img'
                                src='https://i.pinimg.com/564x/ce/fb/f1/cefbf106f3d9882452d4a2844ce88472.jpg'
                                alt='random-img'></img>
                            <img
                                className='rounded-4 p-2 hover-img'
                                src='https://i.pinimg.com/564x/ea/c5/83/eac5831ed224678eb6d2275a45ab22ed.jpg'
                                alt='random-img'></img>
                            <img
                                className='rounded-4 p-2 hover-img'
                                src='https://i.pinimg.com/564x/e0/2b/bb/e02bbb79f11c5982718acb3ac426cc9c.jpg'
                                alt='random-img'></img>
                            <img
                                className='rounded-4 p-2 hover-img'
                                src='https://i.pinimg.com/564x/60/55/ff/6055ffb9160300ad693cb85d6cdcfb99.jpg'
                                alt='random-img'></img>
                            <img
                                className='rounded-4 p-2 hover-img'
                                src='https://i.pinimg.com/236x/82/0d/5f/820d5f79056469316e0bbe76134e70db.jpg'
                                alt='random-img'></img>
                        </div>
                    </section>
                </section>
            </div>
        </>
    );
};

export default Tours;
