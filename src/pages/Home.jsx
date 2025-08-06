import React, { useState } from 'react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Carusel from '../components/Carusel'
import Procces from '../components/Procces'
import GerBestProducts from '../components/GerBestProducts'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'

function Home() {
  const [color, setColor] = useState('5c3c2967')

    window.addEventListener('scroll', () => {
        if (scrollY > 50) {
            setColor('534239')
        } else {
            setColor('5c3c2967')
        }
    })
  
  return (
    <>
    
        <Header className={`flex bg-[#${color}] p-6 pl-20 pr-20 justify-between items-center fixed ttt w-full z-100 transition duration-700 ease-in-out`}/>
    <div className='bg-image min-h-screen relative overflow-hidden'>
        <Layout/>
        <img className='rotate-[180deg] absolute top-150 z-1' src="public/images/Line.png" alt="" />
        
    </div>
    <main className='flex flex-col items-center justify-center'>
      <h1 className='relative z-2 text-center text-4xl font-extrabold text-[#534239] top-50'>Алматы қаласында жалға берілітін заттар саны <span className='font-black text-[#ADC178]'>27 347</span></h1>
      
      <div className='relative'>
        <Carusel/>
      </div>
      <img className=' absolute top-300 z-1' src="public/images/Line.png" alt="" />
      <h1 className='relative z-2 text-center text-4xl font-extrabold text-[#534239] mt-150'>Жалға алу процесі қалай жүреді</h1>
      
      <section className="grid grid-cols-2 gap-30">
        <Procces number='1' image='public/images/procces5.jpg' text="Меншік иесі өзінің затын тегін жариялайды" pText='Берілген заттың жағдайын уайымдаудың керегі жоқ себебі сіздің затыңыз ' span='сақтандырылған.'/>
        <Procces number='2' image='public/images/procces1.jpg' text="Жалға алушы өзіне керек тауарды таңдайды" pText='Алған зат боспа? Ол зат бос емес уақыт ішінде ала алмайсыз. ' />
        <Procces number='3' image='public/images/20943572.jpg' text="Меншік иесі келісім береді немесе бас тартады" pText='Болмаса уақытын, бағасын немес затты өзгертіп жаңа келісім жасайды. '/>
        <Procces number='4' image='public/images/procces4.jpg' text="Жалға алушы ақшасын төлеп, төлемді растайды" pText='Заттың қолжетімділігіне кепілдік беру және транзакция бағасын бекіту үшін. '/>
        <Procces number='5' image='public/images/procces3.jpg' text="Меншік иесі затты клиентке береді және жалға беру басталады" pText='Бұл келісім-шартқа және қабылдау актісіне қойылған қол, бірақ қағазсыз. '/>
        <Procces number='6' image='public/images/procces2.jpg' text="Жалға алушы затты қайтарады, иесі «Жалдауды аяқтау» түймесін басады." pText='Бұл қайтару актісіне қол қою - мәміленің аяқталуы, иесі ақшаны алады. '/>
      </section>

      <img src="public/images/linemin.png" alt="" />
      <h1 className='text-4xl font-extrabold text-start'>Топ тауарлар 🔥</h1>
      <section className='grid grid-cols-3 gap-20 mt-15'>
          
          <GerBestProducts/>
      </section>

      <Subscribe/>
      
    </main>

    <Footer/>
    
    </>
    
  )
}

export default Home