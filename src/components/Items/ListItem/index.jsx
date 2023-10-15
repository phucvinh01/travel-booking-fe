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
            <div className='container' >
                <h3>{title}</h3>
                <h5>{subtitle}</h5>
                <div className='row'>
                    {data && data?.length > 0 && data.map((item, index) => {
                        return (
                            <>
                                <div className='col-lg-4 col-md-6 col-sm-12'>
                                    <Item
                                        key={index}
                                        data={item}
                                    />
                                </div>
                            </>
                        )
                    })}
                </div>
                {/* <div className='text-center'><Button to={ "/" } type='default' size='large'>Xem Thêm Tour</Button></div> */}
            </div>}
        </>
    )
}

export default ListItem