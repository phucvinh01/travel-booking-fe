import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import ModalCreateAir from '../../components/ModalCreateAir';
import TableFlight from '../../components/TableFlight';

const TransportManager = () => {
    const ari = useSelector((state) => state.airfield.airfield.data);
    const flight = useSelector((state) => state.flight.flight.data);


    console.log(ari);

    return (
        <main style={{ marginTop: "90px", minHeight: "100vh" }}>
            <h2>Danh sách các sân bay</h2>
            <Space direction='vertical' size={'large'}>
                <select className='form-control'>
                    {
                        ari?.map((item, index) => {
                            return (
                                <>
                                    <option key={index} value={item.idSanBay}>{item.tenSanBay}</option>
                                </>
                            )
                        })
                    }
                </select>
                <ModalCreateAir />
                <div>
                    <Space direction='vertical'>
                        <h2>Dach sách các chuyến bay</h2>
                        <Space>
                            <Button icon={<PlusCircleFilled />}>Thêm một chuyến bay</Button>
                        </Space>
                        <TableFlight data={flight} />
                    </Space>

                </div>
            </Space>

        </main>
    )
}

export default TransportManager