import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='flex items-center justify-center'>
            <h3 className=''><Link href='/Cart'>Cart</Link></h3>
            <h3>Order</h3>
            <h3>Log out</h3>
        </div>
    )
}

export default Header
