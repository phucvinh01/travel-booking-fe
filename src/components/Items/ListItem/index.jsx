import React, { lazy } from 'react'
import { Link } from 'react-router-dom'
import Loadable from '../../../util/Loadable';
import { Button } from 'antd';

const Item = Loadable(
    lazy(() => import("../Item")),
);

const ListItem = (props) => {

    const { title, subtitle, data } = props
    return (
        <> {
            <div className='container py-3' >
                <h3>{ title }</h3>
                <h5>{ subtitle }</h5>
                <div className='row justify-content-start'>
                    { data && data.map((item, index) => {
                        return (
                            <Item
                                key={ index }
                                data={ item }
                            />)
                    }) }
                </div>
                <div className='text-center'><Button to={ "/" } type='default' size='large'>Xem Thêm Tour</Button></div>
            </div> }
        </>
    )
}

export default ListItem