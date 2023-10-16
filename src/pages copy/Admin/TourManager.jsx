import { Button, Card, Empty, Space } from 'antd'
import { Plus } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import ModalCreateTour from '../../components/ModalCreateTour'
import ModalCreateCategory from '../../components/ModalCreateCategory'
import { useSelector } from 'react-redux'
import Item from '../../components/Items/Item'
import TableTour from '../../components/TableTour'

const TourManager = () => {
    const tours = useSelector((state) => state.tour.tours.data);
    return (
        <>
            <main style={{ marginTop: "90px", minHeight: "100vh" }}>
                <section>
                    <Space size={'large'}>
                        <ModalCreateTour />
                        <ModalCreateCategory />
                    </Space>
                </section>
                <section className='container p-3 mx-auto'>
                    <TableTour data={tours} />
                </section>
            </main>
        </>
    )
}

export default TourManager