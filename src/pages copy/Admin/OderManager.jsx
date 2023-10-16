import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllOrder } from '../../Axios/Order'
import TableManagerOrder from '../../components/OrderTableManager'

const OderManager = () => {

    const [data, setData] = useState([])

    const getData = async () => {
        let r = await getAllOrder()
        if (r) {
            setData(r)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <main style={{ marginTop: "90px", minHeight: "100vh" }}>
            <div className='d-flex justify-content-center'>
                <TableManagerOrder data={data} />
            </div>
        </main>
    )
}

export default OderManager