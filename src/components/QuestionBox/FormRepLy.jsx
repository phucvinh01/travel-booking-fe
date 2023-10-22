import { EnterOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useState } from 'react'
import { postReply } from '../../Axios/Question'
import { getAnswer } from '../../redux/api'
import { useDispatch } from 'react-redux'

const FormRepLy = (props) => {
    const { showFormReply, username, idQuestion, setShowFormReply, idTour } = props
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const handleSubmit = async () => {
        let body = {
            "idHoiDap": idQuestion,
            "idKhachHang": username,
            "noiDung": text
        }
        let r = await postReply(body)
        if (r) {
            setText('')
            setShowFormReply(false)
            getAnswer(dispatch, idTour)
        }
    }

    return (
        <div style={ { marginLeft: "100px" } } hidden={ showFormReply ? false : true }>
            <div className='d-flex gap-2'>
                <input onChange={ (e) => setText(e.target.value) } value={ text } placeholder={ `Trả lời ${username}` } className='form-control'></input>
                <Button onClick={ handleSubmit } size='large' icon={ <EnterOutlined /> }></Button>
            </div>
        </div>
    )
}

export default FormRepLy