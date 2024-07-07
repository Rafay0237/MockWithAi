import { Fragment } from 'react'
import { Menu ,Transition } from '@headlessui/react'
import Link from 'next/link'
import { signOut } from '@/redux/user/userSlice'
import {  useDispatch } from 'react-redux'


export default function UserButton({img}) {
  const dispatch=useDispatch()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex ">
          { <img
        src={img}
        alt="Profile"
        className="h-10 w-10 rounded-full object-cover "
    />}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-5 w-44 origin-top-right rounded-md
         bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
          <div>

            <Menu.Item>
                <Link href="/dashboard">
                <p className='text-gray-900 font-semibold  px-4 py-3 text-sm hover:bg-gray-100 border-b'>
                 Profile
                </p>
                </Link>
            </Menu.Item>
   
            <Menu.Item>
                <p className='text-gray-900 font-semibold  px-4 py-3 text-sm hover:bg-gray-100 border-b'
                onClick={()=>{dispatch(signOut())}}>
                 Sign Out
                </p>
            </Menu.Item>

        </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}