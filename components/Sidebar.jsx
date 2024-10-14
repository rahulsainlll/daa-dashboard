'use client'

import React, { useState } from 'react'
import { Home, Calendar, Briefcase, FileText, Users, File, HelpCircle, UserPlus, ClipboardList, AlignJustify, Eye } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const Sidebar = ({ open, setOpen }) => {
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    uid: '',
    email: '',
    otp: '',
  })

  const Menus = [
    { title: 'Home', icon: <Home />, url: '/' },
    { title: 'Clubs', icon: <Briefcase />, url: '/club' },
    { title: 'Dept. Societies', icon: <ClipboardList />, url: '/departSociety' },
    { title: 'Prof. Societies', icon: <FileText />, url: '/profSociety' },
    { title: 'Communities', icon: <Users />, url: '/communities' },
    { title: 'Extra Co-Curricular', icon: <Briefcase />, url: '/extra-curricular' },
    { title: 'Documents', icon: <File />, url: 'https://pvcco-curricularrepo.netlify.app/' },
    { title: 'FAQs', icon: <HelpCircle />, url: '/faqs' },
    { title: 'Group', icon: <Users />, url: '/group' },
    { title: 'Join Now', icon: <UserPlus />, url: '//', onClick: () => setIsOpen(true) },
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    setIsOpen(false)
  }

  return (
    <div
      className={`fixed h-screen py-5 duration-300 ease-in-out transform ${
        open ? 'w-60' : 'w-20'
      } bg-dark-purple border-r-1 backdrop-blur-sm transition-all`}
    >
      <div className="relative mb-24">
        <img
          src="./CU Long.png"
          className={`h-[40px] absolute right-6 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
          alt="CU Long logo"
        />
        <button
          className="absolute flex items-center justify-center text-black bg-white cursor-pointer left-6 top-7 w-7"
          onClick={() => setOpen(!open)}
        >
          <AlignJustify />
        </button>
      </div>

      <ul className="space-y-2">
        {Menus.map((Menu, index) => (
          <li key={index}>
            <Link
              href={Menu.url}
              onClick={Menu.onClick}
              className={`flex items-center px-6 py-3 text-gray-300 hover:bg-light-white rounded-2xl transition-colors duration-200 ${
                path === Menu.url ? 'bg-blue-400 text-white' : ''
              }`}
            >
              <div className={`h-[30px] w-[30px] mr-4 ${path === Menu.url ? 'text-white' : 'text-black'}`}>
                {Menu.icon}
              </div>
              <span
                className={`text-base font-thin hover:text-blue-700 transition-all duration-200 ${
                  open ? 'opacity-100' : 'opacity-0'
                } ${path === Menu.url ? 'text-white' : 'text-black'}`}
              >
                {Menu.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute flex items-center bottom-12 left-6">
        <div className="h-[30px] w-[30px] mr-4 text-black">
          <Eye />
        </div>
        {/* <span
          className={`text-base font-thin text-gray-900 hover:text-blue-700 transition-all duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Visitor Count: 123
        </span> */}
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <DialogTitle as="h3" className="mb-4 text-lg font-medium leading-6 text-center text-gray-900">
              Join a University Body
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              {/* Form fields... */}
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default Sidebar