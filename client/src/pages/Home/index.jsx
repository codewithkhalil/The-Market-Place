import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllProducts, resetProductStatus} from '../../redux/slice/product/productSlice'
import Filters from './Filters'
import { BsFilter } from 'react-icons/bs'
import { Alert, Space } from 'antd'


const Home = () => {
  const [filters, setFilters] = useState({
    status: 'approved',
    category: [],
    age: [],
    search: ''    
  })
  const [hasSearched, setHasSearched] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(true)

  const { products, isSuccess, isLoading } = useSelector((state) => state.product)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllProducts(filters))
  }, [dispatch, filters])

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetProductStatus())
    }
  }, [dispatch, isSuccess])
  

  return (
    products && (<div className='flex gap-5 flex-col md:flex-row'>
      {showFilters && <Filters showFilters={showFilters} setShowFilters={setShowFilters} setFilters={setFilters} filters={filters} />}
      <div className='flex flex-col gap-5 w-full'>
        <div className="flex gap-4 items-center mb-2">
          {!showFilters && 
            <BsFilter 
              size={25} 
              className='cursor-pointer'
              onClick={() => setShowFilters(!showFilters)}
            />}
          <form 
            className='flex items-center w-full' 
            onSubmit={(e) => {
              e.preventDefault()
              setFilters({
                ...filters,
                search: searchText
              })
              setHasSearched(true)
            }}
          >
            <input 
              type="text" 
              placeholder='Search for Products here...' 
              className='border border-gray-200 rounded-md border-solid w-full p-2 h-12'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className={`flex gap-2 ${ hasSearched ?' ml-[-180px]' : ' ml-[-100px]'}`}>
              {hasSearched && <button
                className='border border-solid px-5 rounded gap-2 items-center  shadow-sm cursor-pointer bg-white h-8 text-sm  hover:bg-primary hover:text-white'
                type='button'
                onClick={() => {
                  setSearchText('')
                  setFilters({
                    ...filters,
                    search: ''
                  })
                  setHasSearched(false)
                }}
              >
                Clear
              </button>}
              <button
                type='submit'
                className='bg-primary px-5 rounded gap-2 items-center text-white shadow-sm cursor-pointer border-0 h-8 text-sm'
                disabled={searchText.trim() === ''}
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {products.length > 0 ?(<div className={`w-full grid grid-cols-1 ${showFilters ? 'md:grid-cols-2' : 'md:grid-cols-3'} lg:grid-cols-3 xl:grid-cols-4 gap-5`}>
          {products?.map(product => 
            <div 
              className=' border-gray-300 overflow-hidden rounded-md shadow-md flex flex-col gap-5 bg-white hover:shadow-2xl cursor-pointer'
              onClick={() => navigate(`/product/${product._id}`)}
              key={product._id}
            >
              <img src={product.images[0]} alt="" className='w-full h-56 p-3 rounded-lg hover:scale-110 duration-300' />
              <div className='px-2 flex flex-col pb-2'>
                <p className='text-blue-700 text-xl font-medium'>$ {product.price}</p>
                <p className='text-xl'>{product.name}</p>
                <p className="text-gray-600 text-sm"> {product.age} year{product.age > 1 && 's'} old</p>
              </div>
            </div>
          )}
        </div>): 
        <Space
          direction="vertical"
          style={{
          width: '100%',
          }}
        >
          <Alert message="There are no products to display " banner />
        </Space> }
      </div>
    </div>)
  ) 
}

export default Home