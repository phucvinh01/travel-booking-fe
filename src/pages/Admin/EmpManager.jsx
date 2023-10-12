import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { Export } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import ModalCreateEmp from '../../components/ModalCreateEmp'
import { getAllEmp } from '../../Axios/Employee'
import TableEmp from '../../components/TableEmp'
import { CSVLink, CSVDownload } from "react-csv";
import moment from 'moment'
import ModalEditEmp from '../../components/ModalEditEmp'
const EmpManager = () => {
    const [data, setData] = useState([])
    const [dataExport, setdataExport] = useState([])

    const getDataEmp = async () => {
        let res = await getAllEmp()
        if (res) {
            setData(res)
        }
    }

    const getEmpExport = (event, done) => {
        let r = []
        if (data && data.length > 0) {
            r.push(["Id", "Họ tên", "Giới tính", "Số điện thoại", "Ngày sinh", "Ngày bắt đầu làm việc", "Chức vụ"])
            data.map((item, index) => {
                let arr = [];
                arr[0] = item.id,
                    arr[1] = item.tenNhanVien,
                    arr[2] = item.gioiTinh ? "Nam" : "Nữ",
                    arr[3] = item.soDienThoai,
                    arr[4] = moment(item.ngaySinh).format("DD/MM/YYY"),
                    arr[5] = moment(item.ngayVaoLam).format("DD/MM/YYY"),
                    arr[6] = item.maLoaiNhanVien === '1' ? "Admin" : item.maLoaiNhanVien === '2' ? "Nhân viên tư vấn" : "Hướng dẫn viên"
                r.push(arr)
            })
            setdataExport(r)
            done()
        }
    }

    useEffect(() => {
        getDataEmp()
    }, [])

    return (
        <main style={ { marginTop: "90px", minHeight: "100vh" } }>
            <section>
                <Space>
                    <ModalCreateEmp getDataEmp={ getAllEmp } />
                    <Button size='large' icon={ <Export size={ 16 } weight="fill" /> } style={ { backgroundColor: "yellowgreen" } }>
                        <CSVLink filename='employee'
                            data={ dataExport }
                            asyncOnClick={ true }
                            onClick={ getEmpExport }
                        >Xuất danh sách nhân viên</CSVLink>
                    </Button>
                    <Button size='large' icon={ <PlusCircleOutlined /> } style={ { backgroundColor: "palegoldenrod" } }>
                        Tại một tài khoản
                    </Button>
                </Space>
            </section>
            <section>
                <TableEmp data={ data } />
            </section>
        </main>
    )
}

export default EmpManager