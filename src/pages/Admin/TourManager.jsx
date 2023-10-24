import { Button, Card, Empty, Space } from 'antd'
import { Export, Plus } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import ModalCreateTour from '../../components/ModalCreateTour'
import ModalCreateCategory from '../../components/ModalCreateCategory'
import { useDispatch, useSelector } from 'react-redux'
import Item from '../../components/Items/Item'
import TableTour from '../../components/TableTour'
import { CSVLink } from 'react-csv'
import { getItemsAdmin } from '../../redux/api'

const TourManager = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        getItemsAdmin(dispatch)
    }, [])

    const tours = useSelector((state) => state.tour.tours.data);
    const [dataExport, setdataExport] = useState([])
    const cate = useSelector((state) => state.cate.category.data);

    const getName = (id) => {
        const comparisonItem = cate.find(item => item.idLoaiTour === id);
        return comparisonItem.tenLoai;
    }

    const getEmpExport = (event, done) => {
        let r = []
        if (tours && tours.length > 0) {
            r.push(["Id", "Tên tour", "Chi phí", "Phương tiện di chuyển", "Mã Loại", "Mô tả"])
            tours.map((item, index) => {
                let arr = [];
                arr[0] = item.idTour,
                    arr[1] = item.idTour,
                    arr[2] = item.phuongTienDiChuyen,
                    arr[3] = item.chiPhi,
                    arr[4] = getName(item.maLoaiTour),
                    arr[5] = item.moTa,
                    r.push(arr)
            })
            setdataExport(r)
            done()
        }
    }
    return (
        <>
            <main style={ { marginTop: "90px", minHeight: "100vh" } }>
                <section>
                    <Space size={ 'large' }>
                        <ModalCreateTour />
                        <ModalCreateCategory />
                        <Button size='large' icon={ <Export size={ 16 } weight="fill" /> } style={ { backgroundColor: "yellowgreen" } }>
                            <CSVLink filename='tour'
                                data={ dataExport }
                                asyncOnClick={ true }
                                onClick={ getEmpExport }
                            >Xuất danh sách tour</CSVLink>
                        </Button>
                    </Space>
                </section>
                <section className='container p-3 mx-auto'>
                    <TableTour data={ tours } />
                </section>
            </main>
        </>
    )
}

export default TourManager