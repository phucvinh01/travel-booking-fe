import React, { useState } from 'react';
import { Button, Modal, Space, Spin, message } from 'antd';
import { PlusCircleFilled, SaveFilled } from '@ant-design/icons';
import { postCreateAir } from '../../Axios/Air';
import { useDispatch } from 'react-redux';
import { getAri } from '../../redux/api';
const ModalCreateAir = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCreate = async () => {
        let body =
        {
            "tenSanBay": name.trim()
        }

        setIsLoading(true)

        let r = await postCreateAir(body)

        if (r.status === 400) {
            message.error("Có gì đó không đúng?")
            setIsLoading(false)
            return
        }
        else {
            message.success(`Thêm ${name} thành công`)
            getAri(dispatch)
            setIsLoading(false)
            handleCancel()
        }
    }

    return (
        <>
            <Button onClick={showModal} style={{ backgroundColor: "yellowgreen" }} size='large' icon={<PlusCircleFilled />}>Thêm một sân bay</Button>
            <Modal footer={null} title="Thêm sân bay" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Space>
                    <label>Tên sân bay</label>
                    <input className='form-control' type='text' onChange={(e) => setName(e.target.value)} />
                    <Button onClick={handleCreate} icon={<SaveFilled />} >{isLoading ? <Spin /> : "Lưu"}</Button>
                </Space>
            </Modal>
        </>
    );
};
export default ModalCreateAir;