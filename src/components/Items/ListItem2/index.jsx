import React from 'react'
import ItemVer2 from '../Item2'

const ListItem2 = (props) => {
    const { data } = props
    return (
        <div className='p-3'>
            { data && data?.length > 0 && data.map((item, index) => {
                return (
                    <ItemVer2
                        key={ index }
                        data={ item }
                    />)
            }) }
        </div>
    )
}

export default ListItem2