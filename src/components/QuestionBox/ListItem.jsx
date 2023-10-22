import React from 'react'
import Item from './Item'
import { Empty } from 'antd'
import { useSelector } from 'react-redux';


const ListAnswer = (props) => {
    const answerList = useSelector((state) => state.anwser.Anwser.data);
    return (
        answerList?.length > 0 ? answerList?.map((item, index) => {
            return (
                <Item
                    idTour={ props.idTour }
                    repley={ item?.danhSachCauTraLoi }
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