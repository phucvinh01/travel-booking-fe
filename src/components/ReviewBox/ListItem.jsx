import React from 'react'
import Item from './Item'


const ListComment = ({ data }) => {
    return (
        data && data.length > 0 && data.map((item, index) => {
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

        })
    )
}


export default ListComment