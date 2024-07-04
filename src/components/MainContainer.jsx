import React from 'react'
import './myStyles.css'
import SideBar from './SideBar';
import WorkArea from './WorkArea';

const MainContainer = () => {
  return (
    <div className='main-container'>
      <SideBar/>
      <WorkArea/>
    </div>
  )
}

export default MainContainer;