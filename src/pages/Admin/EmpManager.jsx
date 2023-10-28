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
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmployee } from '../../redux/api'
import { getAllTypeEmp } from '../../Axios/TypeEmp'
import ModalCreateAccountEmp from '../../components/ModalCreateAccountEmp'
const EmpManager = () => {
    const [data, setData] = useState([])
    const [dataExport, setdataExport] = useState([])
    const dispatch = useDispatch
    const emp = useSelector((state) => state.emp.emp.data)
    const [listTypeEmp, setListTypeEmp] = useState([])
    const getEmpExport = (event, done) => {
        let r = []
        if (emp && emp.length > 0) {
            r.push(["Id", "Họ tên", "Giới tính", "Số điện thoại", "Ngày sinh", "Ngày bắt đầu làm việc", "Chức vụ"])
            emp.map((item, index) => {
                let arr = [];
                arr[0] = item.idNhanVien,
                    arr[1] = item.tenNhanVien,
                    arr[2] = item.gioiTinh ? "Nam" : "Nữ",
                    arr[3] = item.soDienThoai,
                    arr[4] = moment(item.ngaySinh).format("DD/MM/YYYY"),
                    arr[5] = moment(item.ngayVaoLam).format("DD/MM/YYYY"),
                    arr[6] = item.maLoaiNhanVien === listTypeEmp.idLoaiNhanVien ? listTypeEmp.tenLoai : ""
                r.push(arr)
            })
            setdataExport(r)
            done()
        }
    }
    const getType = async () => {
        let r = await getAllTypeEmp()
        if (r.status === 400) {
            message.error("Lấy list loại nhân viên thất bại")
        }
        else {
            setListTypeEmp(r)
        }
    }

    return (
        <main style={ { marginTop: "90px", minHeight: "100vh" } }>
            <section>
                <Space>
                    <ModalCreateEmp />
                    <Button size='large' icon={ <Export size={ 16 } weight="fill" /> } style={ { backgroundColor: "yellowgreen" } }>
                        <CSVLink filename='employee'
                            data={ dataExport }
                            asyncOnClick={ true }
                            onClick={ getEmpExport }
                        >Xuất danh sách nhân viên</CSVLink>
                    </Button>
                    <ModalCreateAccountEmp />
                </Space>
            </section>
            <section>
                <TableEmp data={ emp } />
            </section>
        </main>
    )
}

export default EmpManager