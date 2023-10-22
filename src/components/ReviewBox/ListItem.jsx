import React from 'react'
import Item from './Item'
import { Empty } from 'antd'


const ListComment = ({ data }) => {
    return (
        data.length > 0 ? data.map((item, index) => {
            return (
                <div key={ index }>
                    <Item
                        key={ index }
                        username={ item.idNguoiDung }
                        reviewText={ item.noiDung }
                        rating={ item.danhGia }
                    />
                </div>
            )

        }) : <Empty description={ "Chưa có nhận xét nào về tour này" } />
    )
}


export default ListComment