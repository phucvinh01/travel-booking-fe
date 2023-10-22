import React, { useEffect, useState } from 'react'
import Item from './Item'
import 'animate.css';
import { Empty } from 'antd';
const ListReply = (props) => {

    const { showReply, repley } = props

    const [listRep, setListRep] = useState([])

    return (
        <div hidden={ showReply } style={ { marginLeft: 100 } } className={ showReply ? "animate__animated animate__fadeOut" : "animate__animated animate__fadeIn" }>{
            repley?.length > 0 && repley?.map((item, index) => {
                return (
                    <div key={ index }>
                        <Item
                            hidden={ true }
                            idQuestion={ item.idHoiDap }
                            username={ item.idKhachHang }
                            text={ item.noiDung }
                            day={ item.ngayDang }
                        />
                    </div>
                )
            })
        }</div>
    )
}

export default ListReply