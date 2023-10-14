import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
const TableFlight = (props) => {
    const ari = useSelector((state) => state.airfield.airfield.data);

    const columns = [
        {
            title: 'Tên hãng',
            dataIndex: 'hangBay',
        },
        {
            title: 'Giờ khởi hành',
            dataIndex: 'gioKhoiHanh',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Date.parse(a.gioKhoiHanh) - Date.parse(b.gioKhoiHanh),
            render: (_, { gioKhoiHanh }) => (
                <>
                    {<span>{moment(gioKhoiHanh).format('MM/DD/YYYY')}</span>}
                </>
            )
        },
        {
            title: 'Giờ đến',
            dataIndex: 'gioDen',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Date.parse(a.gioDen) - Date.parse(b.gioDen),
            render: (_, { gioDen }) => (
                <>
                    {<span>{moment(gioDen).format('MM/DD/YYYY')}</span>}
                </>
            )
        },
        {
            title: 'Sân bay',
            dataIndex: 'noiKhoiHanh',
            key: 'noiKhoiHanh',
            filters: ari?.map((item) => {
                return (
                    {
                        text: item?.tenSanBay,
                        value: item?.idSanBay
                    }
                )
            }),
            onFilter: (value, record) => record.idSanBay === value,
            render: (text, record) => {
                const comparisonItem = ari.find(item => item.idSanBay === record.noiKhoiHanh);
                return comparisonItem?.tenSanBay;
            }
        },
        {
            title: 'Khứ hồi',
            dataIndex: 'khuHoi',
            key: 'khuHoi',
            render: (_, { khuHoi }) => (
                <>
                    {<span>{khuHoi ? "Có" : "Không"}</span>}
                </>
            ),
            filters: [
                {
                    text: "Có",
                    value: true
                },
                {
                    text: "Không",
                    value: false
                }
            ],
            onFilter: (value, record) => record.khuHoi === value,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            render: (_, { trangThai }) => (
                <>
                    {<span>{trangThai ? "Chưa bay" : "Đã bay"}</span>}
                </>
            ),
            filters: [
                {
                    text: "Chưa bay",
                    value: true
                },
                {
                    text: "Đã bay",
                    value: false
                }
            ],
            onFilter: (value, record) => record.trangThai === value,
        },
    ];
    return (
        <>
            <Table style={
                { width: 1000 }
            } columns={columns} dataSource={props.data} />;
        </>
    )
}
export default TableFlight;