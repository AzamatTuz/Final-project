import React from 'react'

function AsideCatalog({ setCategory, category }) {
    const categoryStyle = 'text-white text-xl cursor-pointer textDecoration w-40'
    const categories = ['Барлығы','Сәбилерге','Киімдер','Туризм','Декор','Жиһаз','Техникалар','Ойындар мен консольдер','Құралдар','Музыкалық аспаптар','Спорт және демалыс',]

    
  return (
    <aside className='sticky top-19 flex flex-col bg-[#534239] w-fit p-8 h-full gap-4'>
        <h3 className='text-white text-2xl font-bold'>Категориялар</h3>
        {categories.map((item, i) => 
            <span key={i} onClick={() => setCategory(item)} className={`${categoryStyle} ${category == item && 'textDecorationOn'}`}>{item}</span>
        )}
    </aside>
  )
}

export default AsideCatalog