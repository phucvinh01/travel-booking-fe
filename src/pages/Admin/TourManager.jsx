import { Button, Card, Space } from 'antd'
import { Plus } from 'phosphor-react'
import React from 'react'
import ModalCreateTour from '../../components/ModalCreateTour'
import ModalCreateCategory from '../../components/ModalCreateCategory'

const TourManager = () => {
    return (
        <>
            <main style={ { marginTop: "90px", minHeight: "100vh" } }>
                <section>
                    <Space size={ 'large' }>
                        <ModalCreateTour />
                        <ModalCreateCategory />
                    </Space>
                </section>
            </main>
        </>
    )
}

export default TourManager