"use client"
import { Problems } from '@/lib/atom'
import pb from '@/utils/pocketbase'
import { useAtom } from 'jotai'
import React from 'react'



const page = () => {

  const [count, setCount] = useAtom(Problems)
  
  return (
    <div>
      Protected route
    </div> 
  )
}

export default page