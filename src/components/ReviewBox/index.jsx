import { Button, Form, Input, Rate, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ListComment from './ListItem'
import { getAllReviewInTourById, postReview } from '../../Axios/Reviews'
import { getOneCusTomerByIdAccoutn } from '../../Axios/customer'

const ReviewBox = (props) => {


    const { idTour } = props

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [listComment, setListComment] = useState([])
    const [idCustomer, setIdCuscomter] = useState({})
    const user = useSelector((state) => state.auth.login.currentUser);

    const getComment = async (idTour) => {
        let r = await getAllReviewInTourById(idTour)
        if (r) {
            setListComment(r)
        }
    }
    const getCustomer = async (idAccount) => {
        let r = await getOneCusTomerByIdAccoutn(idAccount)
        if (r) {
            setIdCuscomter(r)
        }
    }

    console.log(idCustomer);
    useEffect(() => {
        getComment(idTour)
    }, [idTour])

    useEffect(() => {
        if (user) {
            getCustomer(user?.idTaiKhoan)
        }
    }, [])



    const handleSubmit = async () => {
        let body = {
            "idNguoiDung": idCustomer?.idKhachHang,
            "idTour": idTour,
            "noiDung": comment,
            "danhGia": rating
        }
        let res = await postReview(body)
        if (res) {
            setRating(0)
            setComment("")
            getComment(idTour)
        }
    }
    return (
        <>
            <div className='border p-4 rounded-3'>
                <h4 className='mb-3'>
                    Nhận xét ({ listComment.length })
                </h4>

                <div hidden={ !user ? true : false }>
                    <div>
                        <Rate
                            className='mb-3'
                            allowHalf defaultValue={ 0 }
                            onChange={ setRating } value={ rating } />
                    </div>
                    <div className='d-flex gap-2' >
                        <input
                            value={ comment }
                            className='form-control'
                            disabled={ !user ? true : false }
                            placeholder={ !user ? "You need login" : "Share you think" }
                            name='comment'
                            onChange={ (e) => setComment(e.target.value) } />
                        <Button
                            size='large'
                            onClick={ handleSubmit }
                            disabled={ !user ? true : false }
                            className='btn-tour-booking'>Submit</Button>
                    </div>
                </div>
                <ListComment data={ listComment }></ListComment>
            </div>
        </>
    )
}

export default ReviewBox