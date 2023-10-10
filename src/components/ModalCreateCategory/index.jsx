import { Button, Modal, Space, Spin, message } from 'antd';
import { set } from 'lodash';
import { Plus, PlusCircle } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react'
import { createOneCategory } from '../../Axios/Category';

const ModalCreateCategory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [isFull, setIsFull] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        if (!isModalOpen) {
            setName("")
        }
    }, [isFull, isModalOpen, name])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = () => {

        if (!name) {
            inputRef.current.focus();
            return
        }
        setIsLoading(true)
        let res = createOneCategory(name)
        console.log(res);
        if (res) {
            setTimeout(() => {
                setIsLoading(false)
                message.success("Thêm một loaị tour thành công")
                handleCancel()
            }, [2000])
        }
        else {
            setTimeout(() => {
                setIsLoading(false)
                message.error("Thêm thất bại")
            }, [1000])
        }
    }
    return (
        <>
            <Button onClick={ showModal } size='large' icon={ <Plus size={ 16 } /> } style={ { backgroundColor: "greenyellow" } }>
                <Space>
                    <p>Thêm một loại tour</p>
                </Space>
            </Button>
            <Modal width={ 550 } footer={ null } title="Thêm một loại tour" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <Space size={ 'large' } align='center'>
                    <label>Tên loại tour</label>
                    <input ref={ inputRef } maxLength={ 30 } onChange={ (e) => setName(e.target.value) } value={ name } type='text' className='form-control' />
                    <Button onClick={ () => handleSubmit() } style={ { backgroundColor: "greenyellow" } } icon={ <PlusCircle size={ 18 } /> }>{ isLoading ? <Spin></Spin> : "Thêm" }</Button>
                </Space>

            </Modal>
        </>
    );
}

export default ModalCreateCategory