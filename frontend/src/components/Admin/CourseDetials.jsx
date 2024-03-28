import React from 'react'
import HeroLeft from './HeroLeft'
import HeroRight from './HeroRight'

function CourseDetials() {
  return (
    <>
    <div className='Main' style={{display:"flex",justifycontent: "space-between"}}>
      <HeroLeft/>
      <HeroRight/>
    </div>
    </>
  )
}

export default CourseDetials