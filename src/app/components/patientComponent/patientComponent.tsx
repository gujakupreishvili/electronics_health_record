import Button from '@/components/button/button'
import React from 'react'
import { FaRegUser } from 'react-icons/fa'
import { LuSparkles } from 'react-icons/lu'

export default function PatientComponent() {
  return (
    <div className='flex flex-col border-[1px] border-gray-300 rounded-[6px] px-[15px] py-[20px] lg:w-[28%] w-[95%]'>
      <div className='flex  items-center gap-[15px] mb-[12px]'>
        <div className='w-[40px] h-[40px] rounded-[20px] bg-blue-100 flex items-center justify-center'><FaRegUser className='text-blue-600' /></div>
        <div className='flex flex-col'>
          <h3 className='text-[15px] font-bold uppercase'>Irakli betxo</h3>
          <p className='text-[12px] text-gray-600'>600011500789</p>
        </div>
      </div>
      {/*  */}
      <div className='flex flex-col gap-[12px]'>
        <div>
          <p className='font-normal'>ასაკი: <span className='font-semibold'>22</span></p>
          <p className='font-normal'>Sex: <span className='font-semibold'>მამრობითი</span></p>
        </div>
        <p className='font-normal'>ტელეფონის ნომერი: <span className='font-semibold'>551542421</span></p>
      </div>
      <p className='font-normal'>ჩივილები:</p>
      <div className='border-[1px] border-gray-300 bg-amber-50 rounded-[6px] my-[10px] px-[10px]'>
        <p>საბოლოო დიაგნოზი:</p>
        <p>დიაგნოზი</p>
      </div>
      <p className='font-normal'>თარიღი: <span className='font-semibold'>10/19/25</span></p>
      <Button  icon={LuSparkles } text='ხელოვნური ინტელექტი  ' className='flex items-center hover:bg-gray-200 duration-500 justify-center py-[10px] border-[1px] border-gray-300 rounded-[8px] px-[8px] mt-[10px] mb-[5px] gap-[8px]'/>  
    </div>
  )
}
