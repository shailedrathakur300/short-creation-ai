import React from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
        <SideNav />
      </div>
      <div>
        <Header />
        <div className="md:ml-64">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
