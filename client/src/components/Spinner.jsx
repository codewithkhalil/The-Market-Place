import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Spinner = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { isLoading: userLoading } = useSelector((state) => state.user)
  const { isLoading: bidLoading } = useSelector((state) => state.bid)
  const { isLoading: productLoading} = useSelector((state) => state.product)
  const { isDeleting} = useSelector((state) => state.notification)

  useEffect(() => {
    if (userLoading || productLoading || bidLoading || isDeleting) {
      setIsLoading(true)
    }
  }, [bidLoading, isDeleting, productLoading, userLoading])
  useEffect(() => {
    if (!userLoading && !productLoading && !bidLoading && !isDeleting) {
      setIsLoading(false)
    }
  }, [bidLoading, isDeleting, productLoading, userLoading])
  
  return (
    isLoading && (<div 
      className='fixed inset-0 bg-black z-[9999] flex items-center justify-center opacity-50 '
    >
      <div className="w-10 h-10 border-4 border-solid border-white border-t-transparent rounded-full animate-spin"></div>
    </div>)
  )
}

export default Spinner