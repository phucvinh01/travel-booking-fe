import React from 'react'
import Item from './Item'
import { Empty } from 'antd'


const ListAnswer = ({ data }) => {
    return (
        data.length > 0 ? data.map((item, index) => {
            return (
                <Item
                    key={ index }
                    idQuestion={ item.idHoiDap }
                    username={ item.idNguoiDung }
                    text={ item.noiDung }
                    day={ item.ngayDang }
                />
            )

        }) : <Empty description={ "Hiện chưa có câu hỏi nào cho Tour này" } className='mt-2' />
    )
}


export default ListAnswer