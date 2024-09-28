'use client'
import React, { createContext, useContext, useState } from 'react'
type Iecommerce = {
    userName: string,
    setuserName: React.Dispatch<React.SetStateAction<string>>
    // setuserName:()=>
}
const ecommerceContext = createContext<Iecommerce | null>(null)

export const Context = ({ children }) => {
    const ecommerceData = useContext(ecommerceContext)
    const [userName, setuserName] = useState<Iecommerce | null>(null)


    return (
        <ecommerceContext.Provider value={[userName, setuserName]}>
            {children}
        </ecommerceContext.Provider>
    )
}

// // const Context = ({ children }) => {
//     const ecommerceContext = createContext('')
//     const ecommerceData = useContext(ecommerceContext)
//     const [userName, setuserName] = useState<Iecommerce | null>(null)
//     interface Iecommerce{
//         userName:string,
//         setuserName:React.Dispatch<React.SetStateAction<string>>
//     }
//     return (
//         <ecommerceContext.Provider value={[userName, setuserName]}>
//             {children}
//         </ecommerceContext.Provider>
//     )
// }

// export default Context