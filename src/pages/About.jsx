import React from 'react'
import "../App.css"
import Header from '../components/Header'
import Footer from '../components/Footer'

function About() {
    
    return (
    
    <>
        <Header className="flex top-0 bg-[#534239] items-center p-6 pl-20 pr-20 justify-between fixed  w-full z-100 transition duration-700 ease-in-out"/>
        <main className='mt-40 flex flex-col items-center pl-60 pr-60 gap-30'>
            <section className='flex items-center gap-25  relative z-2'>
                <article className='w-110 bg-white shadow-2xl flex flex-col items-center gap-10 p-10 rounded-2xl'>
                    <h1 className='text-4xl font-extrabold'>Біз туралы</h1>
                    <p className='text-xl'>Peer-to-Peer жалға беру платформасы – адамдар өз заттарын басқа қолданушыларға белгілі бір уақытқа жалға бере алатын цифрлық алаң.</p>
                    <p className='text-xl'>Біздің мақсатымыз – пайдаланылмай тұрған пайдалы заттарды қайта айналымға енгізу арқылы адамдарға қосымша табыс табуға және қажет заттарды ыңғайлы жолмен қолдануға мүмкіндік беру.</p>
                </article>
                <img className='w-130' src="public/images/aboutimage.png" alt="" />
            </section>
            
            <img className='absolute rotate-[15deg] origin-left z-0 top-[80%]' src="public/images/linemin.png" alt="" />
            <img className='absolute z-0 top-[80%]' src="public/images/linemin.png" alt="" />
            <img className='absolute rotate-[-15deg] origin-left z-0 top-[80%]' src="public/images/linemin.png" alt="" />
            
            <section className='relaitve z-2 bg-white w-full shadow-2xl p-8 rounded-3xl flex justify-around mb-30'>

                <article className='w-90 text-center flex flex-col gap-5'>
                    <h1 className='text-3xl font-bold'>Неге бізді таңдайды?</h1>
                    <p className='text-lg'>Қолжетімділік – Қымбат затты сатып алудың қажеті жоқ. Қажетті дүниені тек керек уақытыңа жалға алып, үнемдейсің.</p>
                    <p className='text-lg'>Қосымша табыс – Сіз пайдаланбай тұрған заттарыңызды басқаларға жалға беріп, оңай табыс таба аласыз.</p>
                    <p className='text-lg'>Қауіпсіздік – Біз қолданушылардың тіркелуін мұқият тексереміз және әр мәмілені қорғау жүйесімен қамтамасыз етеміз.</p>
                    <p className='text-lg'>Ыңғайлылық – Барлығы онлайн: жалға беру, жалға алу, төлемдер – барлығы бірнеше қадаммен жүзеге асады.</p>
                </article>

                <article className='bg-[#534239] p-5 rounded-xl flex flex-col gap-5'>
                    <div className='bg-white flex flex-col gap-2 items-center text-[#534239] p-2'><h1 className='text-3xl font-bold'>Қолданушылар саны</h1> <p className='text-2xl font-medium'>2103</p></div>
                    <div className='bg-white flex flex-col gap-2 items-center text-[#534239] p-2'><h1 className='text-3xl font-bold'>Жалға берілген тауарлар саны</h1> <p className='text-2xl font-medium'>21463</p></div>
                    <div className='bg-white flex flex-col gap-2 items-center text-[#534239] p-2'><h1 className='text-3xl font-bold'>Жаңа тауарлар саны</h1> <p className='text-2xl font-medium'>152</p></div>
                    <div className='bg-white flex flex-col gap-2 items-center text-[#534239] p-2'><h1 className='text-3xl font-bold'>Табылған табыс құны</h1> <p className='text-2xl font-medium'>1 225 639 тг</p></div>
                </article>

            </section>

        </main>
        <Footer/>
    </>
  )
}

export default About