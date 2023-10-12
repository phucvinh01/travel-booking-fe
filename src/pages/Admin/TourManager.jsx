import { Button, Card, Empty, Space } from 'antd'
import { Plus } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import ModalCreateTour from '../../components/ModalCreateTour'
import ModalCreateCategory from '../../components/ModalCreateCategory'
import { useSelector } from 'react-redux'
import Item from '../../components/Items/Item'

const TourManager = () => {
    const tours = useSelector((state) => state.tour.tours.data);
    const [data, setData] = useState([])
    useEffect(() => {
        tours && setData(tours)
    }, [])
    return (
        <>
            <main style={ { marginTop: "90px", minHeight: "100vh" } }>
                <section>
                    <Space size={ 'large' }>
                        <ModalCreateTour />
                        <ModalCreateCategory />
                    </Space>
                </section>
                <section>
                    <div className='row'>
                        { data?.length > 0 ? data.map((item, index) => {
                            return (
                                <Item
                                    key={ index }
                                    data={ item }
                                />)
                        }) : <Empty /> }
                    </div>
                </section>
            </main>
        </>
    )
}

export default TourManager