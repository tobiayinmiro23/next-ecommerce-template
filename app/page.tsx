"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usersData } from "@/data";
const page = () => {
  const router = useRouter()
  const [userName, setuserName] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [loading, setloading] = useState<Boolean>(false)

  const signin = () => {
    if (userName.trim() === '' || password.trim() === '') return
    setloading(true)
    fetch('http://localhost:3000/api/Ecommerce/Signin', {
      headers: { 'Content-type': 'application/json' },
      method: 'post',
      cache: "no-store",
      body: JSON.stringify({
        userName,
        password,
      })
    }).then(res => res.json())
      .then(res => {
        // console.log(res)
        setloading(false)
        if (res.status) {
          usersData.userName = res.message.userName
          usersData._id = res.message._id
          router.push('/Product')
        } else alert(res?.message)
      })
      .catch(err => {
        setloading(false)
        console.log(err)
      })

  }

  const getUsers = () => {
    fetch('http://localhost:3000/api/User/Signin',
      { cache: "no-store" }
    ).then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const handleLogin = () => {
    fetch('http://localhost:3000/api/Ecommerce/User/Login', {
      headers: { 'Content-type': 'application/json' },
      method: 'post',
      cache: "no-store",
      body: JSON.stringify({
        userName,
        password
      })
    }).then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (

    <div className="mt-[11rem] w-[24rem] m-[auto]">
      <input type="text" placeholder="username" className="block mb-[1rem] p-[0.3rem] pl-[0.8rem] outline-none rounded-md border-[1px] border-[#c8c5c5] w-[85%]" value={userName} onChange={(e) => setuserName(e.target.value)} />
      <input type="text" className="block mb-[1rem] p-[0.3rem] pl-[0.8rem] outline-none rounded-md border-[1px] border-[#c8c5c5] w-[85%]" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} />
      <Link href='/Login'><p className="w-[85%] text-center">already have an account? login</p></Link>
      {
        loading ?
          <button type="submit" className="block bg-[#19afe0] py-[0.4rem] rounded-md text-white font-bold w-[85%]">loading...</button>
          :
          <button type="submit" className="block bg-[#19afe0] py-[0.4rem] rounded-md text-white font-bold w-[85%]" onClick={signin}>signin</button>
      }
    </div>
  )
}
export default page