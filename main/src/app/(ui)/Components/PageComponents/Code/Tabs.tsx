import React from 'react'

const Tabs = ({setActiveTab , val , activeTab}  :
   {setActiveTab : (activeTab : string) => void , val : string , activeTab : string}) => {
  return (
    <div>
       <button 
                onClick={() => setActiveTab(val)}
                className={`mr-4 pb-2 font-medium ${activeTab ===  val ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
              >
                {val.toUpperCase()}
              </button>
    </div>
  )
}

export default Tabs
