import React from 'react'
import TableHotel from '../../components/TableHotel'
import { useSelector } from 'react-redux';
import { Button, Space } from 'antd';
import ModalCreateHotel from '../../components/ModalCreateHotel';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { Export } from 'phosphor-react';

const HotelManager = () => {
    const hotel = useSelector((state) => state.hotel.hotel.data);
    const [dataExport, setdataExport] = useState([])
    const getEmpExport = (event, done) => {
        let r = []
        if (hotel && hotel.length > 0) {
            r.push(["Tên khách sạn", "Số điện thoại", "Địa chỉ", "Hạng sao"])
            hotel.map((item, index) => {
                let arr = [];
                arr[0] = item.tenKhachSan,
                    arr[1] = item.soDienThoai,
                    arr[2] = item.diaChi,
                    arr[3] = item.hangSao,
                    r.push(arr)
            })
            setdataExport(r)
            done()
        }
    }
    return (
        <main style={{ marginTop: "90px", minHeight: "100vh" }}>

            <Space direction='vertical'>
                <h2>Danh sách các khách sạn hợp tác</h2>
                <Space>
                    <ModalCreateHotel />
                    <Button size='large' icon={<Export size={16} weight="fill" />} style={{ backgroundColor: "yellowgreen" }}>
                        <CSVLink filename='danhsachkhachsan'
                            data={dataExport}
                            asyncOnClick={true}
                            onClick={getEmpExport}
                        >Xuất danh sách khách sạn</CSVLink>
                    </Button>
                </Space>
                <TableHotel data={hotel} />
            </Space>

        </main>
    )
}

export default HotelManager