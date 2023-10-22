import React, { useEffect, useState } from 'react'
import { getAllReviewInTourById } from '../../Axios/Reviews'
import { getOneCusTomerByIdAccoutn } from '../../Axios/customer'
import { useDispatch, useSelector } from 'react-redux'
import ListAnswer from './ListItem'
import { Button } from 'antd'
import { getAllQuestionInTourById, postQuestion } from '../../Axios/Question'
import { getAnswer } from '../../redux/api'

const QuestionBox = (props) => {

    const { idTour } = props


    const [comment, setComment] = useState("")
    const [idCustomer, setIdCuscomter] = useState({})
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch()

    const getCustomer = async (idAccount) => {
        let r = await getOneCusTomerByIdAccoutn(idAccount)
        if (r) {
            setIdCuscomter(r)
        }
    }



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
        }
        let res = await postQuestion(body)
        if (res) {
            setComment("")
            getQuestion(idTour)
        }
    }


    return (
        <div className='border p-4 rounded-3'>
            <h4 className='mb-3'>
                Hỏi đáp
            </h4>
            <div>
                <div className='d-flex gap-2' >
                    <input
                        value={ comment }
                        className='form-control'
                        disabled={ !user ? true : false }
                        placeholder={ !user ? "You need login" : "Mời bạn đặt câu hỏi" }
                        name='comment'
                        onChange={ (e) => setComment(e.target.value) } />
                    <Button
                        size='large'
                        disabled={ !user ? true : false }
                        onClick={ handleSubmit }
                        className='btn-tour-booking'>Submit</Button>
                </div>
            </div>
            <ListAnswer idTour={ idTour } />
        </div>
    )
}

export default QuestionBox