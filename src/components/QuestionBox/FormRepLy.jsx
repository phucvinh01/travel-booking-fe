import { EnterOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

const FormRepLy = (props) => {
    const { showFormReply, username } = props
    return (
        <div style={ { marginLeft: "100px" } } hidden={ showFormReply ? false : true }>
            <div className='d-flex gap-2'>
                <input placeholder={ `Trả lời ${username}` } className='form-control'></input>
                <Button size='large' icon={ <EnterOutlined /> }></Button>
            </div>
        </div>
    )
}

export default FormRepLy