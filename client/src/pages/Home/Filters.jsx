import React from 'react'
import { GrClose } from 'react-icons/gr'


const categories = [
    {
       name: 'Electronics',
       value: 'electronics', 
    },
    {
       name: 'Home',
       value: 'home', 
    },
    {
       name: 'Fashion',
       value: 'fashion', 
    },
    {
       name: 'Sports',
       value: 'sports', 
    },
    {
       name: 'Books',
       value: 'books', 
    },
]

const ages = [
    {
        name: "0-2 years old",
        value: "0-2"
    },
    {
        name: "3-5 years old",
        value: "3-5"
    },
    {
        name: "6-8 years old",
        value: "6-8"
    },
    {
        name: "9-12 years old",
        value: "9-12"
    },
    {
        name: "13+ years old",
        value: "12-20"
    },
]
const Filters = ({
    showFilters,
    setShowFilters,
    filters,
    setFilters
}) => {

  return (
    <div className='md:w-72'>
        <div className='flex justify-between items-center'>
            <h1 className='text-gray-700 text-xl'>Filters</h1>
            <GrClose 
                className='text-xl cursor-pointer' 
                onClick={() => setShowFilters(!showFilters)}
            />
        </div>
        <div className="flex gap-8 md:gap-2 md:flex-col">
            <div className="flex flex-col gap-col mt-4">
                <h1 className='text-gray-600 mb-2'>Categories</h1>
                <div className="flex flex-col">
                    {categories.map(category => {
                        return (
                            <div className='flex items-center gap-3' key={category.value}>
                                <input 
                                    className='h-8'
                                    type="checkbox"
                                    name='category'
                                    checked={filters.category?.includes(category.value)}
                                    style={{width: 15}}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFilters({
                                                ...filters,
                                                category: [...filters?.category, category.value]
                                        })
                                        } else {
                                            setFilters({
                                                ...filters,
                                                category: filters?.category?.filter( 
                                                    (item ) => item !== category.value
                                                )
                                            })
                                        }
                                    }}
                                />
                                <label htmlFor="category">{category.name}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col gap-col mt-4">
                <h1 className='text-gray-600 mb-2'>Product Ages</h1>
                <div className="flex flex-col">
                    {ages.map(age => {
                        return (
                            <div className='flex items-center gap-3' key={age.value}>
                                <input 
                                    className='h-8'
                                    type="checkbox"
                                    name='age'
                                    checked={filters.age?.includes(age.value)}
                                    style={{width: 15}}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFilters({
                                                ...filters,
                                                age: [...filters?.age, age.value]
                                        })
                                        } else {
                                            setFilters({
                                                ...filters,
                                                age: filters?.age?.filter( 
                                                    (item ) => item !== age.value
                                                )
                                            })
                                        }
                                    }}
                                />
                                <label htmlFor="age">{age.name}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Filters