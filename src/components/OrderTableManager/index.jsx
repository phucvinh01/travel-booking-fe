import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Row, Space, Table, Tag } from 'antd';
import { ClearOutlined, EditFilled, ExportOutlined, EyeFilled, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import ModalEditEmp from '../ModalEditEmp';
import formatCurrency from '../../util/formatCurrency';
import { useSelector } from 'react-redux';
import ModalScludeTour from '../ModalScludeTour/inde';
import ModalEditTour from '../ModalEditTour';
import { max } from 'lodash';
import Axios from '../../Axios/Axios';
import ModalDetaiOrder from '../ModalDetailOrder';
import { getAllCustomer } from '../../Axios/customer';

const TableManagerOrder = (props) => {
    const cate = useSelector((state) => state.cate.category.data);
    const tour = useSelector((state) => state.tour.tours.data);

    const { data } = props

    const [customerList, setCustomerList] = useState([])

    const getAllCustomers = async () => {
        let r = await getAllCustomer()
        if (r) {
            setCustomerList(r)
        }
    }

    useEffect(() => {
        getAllCustomers()
    }, [])

    useEffect(() => {
        setTableData(data)
    }, [data])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setState] = useState({})
    const [minDay, setMinDay] = useState("")
    const [maxDay, setMaxDay] = useState("")
    const showModal = (record) => {
        setState(record)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [filteredInfo, setFilteredInfo] = useState({});
    const [tableData, setTableData] = useState(props.data);
    const handleDateSearch = (selectedDate, dateString, dataIndex) => {
        setFilteredInfo((prevFilteredInfo) => ({
            ...prevFilteredInfo,
            [dataIndex]: dateString,
        }));

        const filteredData = data.filter((record) => {
            const recordDate = moment(record[dataIndex]);
            return recordDate.isSame(selectedDate, 'day');
        });

        setTableData(filteredData);
    };

    const handleDateReset = (dataIndex) => {
        setFilteredInfo((prevFilteredInfo) => {
            const { [dataIndex]: removedFilter, ...restFilters } = prevFilteredInfo;
            return restFilters;
        });

        setTableData(data);
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'idDatTour',
            key: 'idDatTour',
            render: (text) => <a>{ text }</a>,
            width: '15%',
        },
        {
            title: 'Tên tour',
            dataIndex: 'maTour',
            key: 'maTour',
            render: (text, record) => {
                const comparisonItem = tour.find(item => item.idTour === record.maTour);
                return comparisonItem.tenTour;
            },
            width: '15%',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'maKhachHang',
            key: 'maKhachHang',
            render: (text, record) => {
                const comparisonItem = customerList?.find(item => item.idKhachHang === record.maKhach);
                return comparisonItem?.hoTen;
            },
            width: '15%',
        },
        {
            title: 'Số lượng người',
            dataIndex: 'soLuong',
            key: 'soLuong',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.soLuong - b.soLuong,
            width: '15%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            filters: [
                { text: 'Chờ khởi hành', value: true },
                { text: 'Đã hoàn thành', value: false },
            ],
            onFilter: (value, record) => record.trangThai.startsWith(value),
            render: (_, { trangThai }) => (
                <>
                    { <span>{ trangThai ? "Chờ khởi hành" : "Đã hoàn thành" }</span> }
                </>
            ),
            width: '20%',
        },
        {
            title: 'Date',
            dataIndex: 'ngayKhoiHanh',
            key: 'ngayKhoiHanh',
            render: (text, record) => moment(text).format('YYYY-MM-DD'),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={ { padding: 8 } }>
                    <DatePicker
                        value={ selectedKeys[0] ? moment(selectedKeys[0], 'YYYY-MM-DD') : null }
                        onChange={ (date, dateString) => setSelectedKeys(dateString ? [dateString] : []) }
                        format="YYYY-MM-DD"
                        style={ { marginRight: 8 } }
                    />
                    <Space>
                        <Button onClick={ () => handleDateReset('date') } style={ { marginRight: 8 } }>
                            Reset
                        </Button>
                        <Button onClick={ () => handleDateSearch(setSelectedKeys) } type="primary">
                            Search
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value, record) => {
                const recordDate = moment(record.date);
                return recordDate.isSame(moment(value, 'YYYY-MM-DD'), 'day');
            },
            filteredValue: filteredInfo.ngayKhoiHanh || null,
            width: '15%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <ModalDetaiOrder data={ record } />
                </Space>
            ),
            width: '10%',
        },
    ];

    useEffect(() => {
        if (minDay && maxDay && minDay > maxDay) {
            setMaxDay(minDay);
        }
    }, [minDay, maxDay]);

    const handleSearch = () => {
        const filteredData = data.filter(item => {
            return item.ngayDat >= minDay && item.ngayDat <= maxDay;
        });
        setTableData(filteredData)
    }

    const [name, setName] = useState("")
    console.log(name);

    const handleSearchByName = async (name) => {
        console.log(name);
        let r = await Axios.get(`/DatTour/get-list-dat-tour-by-tour-id?maTour=${name}`)
        if (r) {
            setTableData(r)
        }
    }

    return (
        <>
            <Space direction='vertical'>
                <Space>
                    <Space>
                        <label>Từ ngày</label>
                        <input type='date' className='form-control' value={ minDay } onChange={ (e) => setMinDay(e.target.value) } />
                    </Space>
                    <Space>
                        <label>Đến ngày</label>
                        <input type='date' className='form-control' value={ maxDay } onChange={ (e) => setMaxDay(e.target.value) } />
                    </Space>
                    <Button disabled={ !minDay && !maxDay ? true : false } onClick={ handleSearch } size='large' icon={ <SearchOutlined /> }>Tìm</Button>
                </Space>
                <Space>
                    <label>Tên Tour</label>
                    <select type='text' value={ name } className='form-control' onChange={ (e) => setName(e.target.value) }>
                        {
                            tour.map((item, index) => {
                                return (
                                    <>
                                        <option key={ index } value={ item.idTour }>{ item.tenTour }</option>
                                    </>
                                )
                            })
                        }
                    </select>
                    <Button disabled={ !name ? true : false } onClick={ () => handleSearchByName(name) } size='large' icon={ <SearchOutlined /> }>Tìm</Button>
                    <Button style={ {
                        backgroundColor: "greenyellow"
                    } } onClick={ () => setTableData(data) } size='large' icon={ <ClearOutlined /> }>Clear</Button>

                </Space>
                <Space direction='vertical' size={ 'large' } style={ { width: '100%' } }>

                    <div>
                        <Table size='large' style={ {
                            width: 1000
                        } } pagination={ {
                            position: ['bottomCenter']
                        } } columns={ columns } dataSource={ tableData } />
                    </div>
                </Space>
            </Space>
        </>
    )
}
export default TableManagerOrder;