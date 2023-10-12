import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { EyeSlash } from 'phosphor-react';
import { EyeFilled } from '@ant-design/icons';
import TabEditCreateScludeTour from '../TabEditCreateScludeTour';
import { getScheduleTour } from '../../Axios/Tour';
const ModalScludeTour = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };



    return (
        <>
            <Button icon={ <EyeFilled /> } type="primary" onClick={ showModal } block>
                Xem chương trình tour
            </Button>
            <Modal footer={ null } width={ 1000 } title="Tất cả chương trình" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <TabEditCreateScludeTour id={ props.id } />
            </Modal>
        </>
    );
};
export default ModalScludeTour;