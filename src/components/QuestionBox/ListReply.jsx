import React, { useEffect, useState } from 'react'
import Item from './Item'

const ListReply = (props) => {

    const { idQuestion } = props

    const [listRep, setListRep] = useState([])

    const getListReply = async (idQuestion) => {
        let r = await getListReply(idQuestion)
        if (r) {
            setListRep(r)
        }
    }

    useEffect(() => {
        getListReply(idQuestion)
    }, [idQuestion])

    return (
        <div style={ { marginLeft: 100 } }>{
            listRep.map((item, index) => {
                return (
                    <div key={ index }>
                        <Item
                            idQuestion={ item.idHoiDap }
                            username={ item.idNguoiDung }
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