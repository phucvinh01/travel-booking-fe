import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Button, Form, Input, Popconfirm, Spin, Table, message } from 'antd';
import { ImportOutlined, SendOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getOneCusTomerByIdAccoutn } from '../../Axios/customer';
import { postCreateOrder, putUpdateOrder } from '../../Axios/Order';
import moment from 'moment';
import _ from 'lodash';
import Axios from '../../Axios/Axios'
import { useNavigate } from 'react-router-dom';
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={ form } component={ false }>
            <EditableContext.Provider value={ form }>
                <tr { ...props } />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={ {
                    margin: 0,
                } }
                name={ dataIndex }
                rules={ [
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ] }
            >
                <Input ref={ inputRef } onPressEnter={ save } onBlur={ save } />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={ {
                    paddingRight: 24,
                } }
                onClick={ toggleEdit }
            >
                { children }
            </div>
        );
    }
    return <td { ...restProps }>{ childNode }</td>;
};
const TableOrder = (props) => {
    const emp = useSelector((state) => state.emp.emp.data)
    const user = useSelector((state) => state.auth.login.currentUser);
    const [info, setInfo] = useState({})
    const [idCustomer, setIdCustomer] = useState("")
    const [loading, setLoading] = useState(false)
    const navigator = useNavigate()

    const getIdCustomer = async (id) => {
        let r = await getOneCusTomerByIdAccoutn(id)
        if (r.status === 400) {
            message.info("Không tìm thấy khách hàng này")
        }
        else {
            setIdCustomer(r.idKhachHang)
        }
    }

    useEffect(() => {
        getIdCustomer(user.idTaiKhoan)
    }, [user])


    const { quantity, idTour, dayOrder } = props
    const [dataSource, setDataSource] = useState(Array.from({ length: quantity }, (_, index) => ({
        hoTen: 'Họ và tên',
        gioiTinh: `Nam`,
        ngaySinh: 'dd/mm/yyyy',
        key: index + 1
    })));

    const [count, setCount] = useState(quantity);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setCount(+count - 1)
        setDataSource(newData);
    };

    const defaultColumns = [
        {
            title: 'Tên',
            dataIndex: 'hoTen',
            width: '30%',
            editable: true,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioiTinh',
            width: '30%',
            editable: true,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaySinh',
            width: '30%',
            editable: true,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={ () => handleDelete(record.key) }>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleAdd = () => {
        const newData = {
            key: count,
            hoTen: `Họ và tên`,
            ngaySinh: 'dd/mm/yyy',
            gioiTinh: `Nam`,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const post = async (body) => {
        return await Axios.post(`/ThanhVien/create-thanh-vien`, body)
    }

    const handleSubmit = async () => {
        setLoading(true)
        let body = {
            "maKhach": idCustomer,
            "maHuongDanVien": emp[0].idNhanVien,
            "maTour": idTour,
            "soLuong": quantity,
            "ngayDat": dayOrder,
            "trangThai": false,
            "thanhViens": []
        }
        let res = await postCreateOrder(body)
        if (res) {
            setTimeout(() => {
                dataSource.map((item) => {
                    return post({
                        "maDatTour": res.idDatTour,
                        "hoTen": item.hoTen.toString(),
                        "gioiTinh": item.gioiTinh === "Nam" ? true : false,
                        "canCuocConDan": null,
                        "ngaySinh": moment(item.ngaySinh).toDate()
                    })
                })
                setLoading(false)
            }, 2500)
            message.success("Đặt tour thành công, chúng tôi sẽ liên hệ với bạn sớm nhất")
            props.handleOk()
            navigator('/me/history')
        }
    }

    return (
        <div>
            {
                count < quantity && <><Button
                    onClick={ handleAdd }
                    type="primary"
                    style={ {
                        marginBottom: 16,
                    } }
                >
                    Add a row
                </Button></>
            }
            <Table
                pagination={ false }
                components={ components }
                rowClassName={ () => 'editable-row' }
                bordered
                dataSource={ dataSource }
                columns={ columns }
            />
            <div className='d-flex justify-content-end mt-3'>
                <Button onClick={ handleSubmit } icon={ loading ? <Spin /> : <SendOutlined /> }></Button>
            </div>

        </div>
    );
};
export default TableOrder;