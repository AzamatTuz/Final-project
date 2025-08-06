import React, { useEffect } from "react";
import Types from "../Types";
import { Link } from "react-router-dom";

function Carusel() {
    let carusel

    useEffect(() => {
        carusel = document.getElementById('carusel')
    },[carusel])
  return (
    <>
    <button onClick={() => carusel.scrollLeft -= 1500} className="z-20 cursor-pointer w-15 flex items-center justify-center rounded-full h-15 absolute top-110 left-[-20px] bg-[#ADC178]"> <img className="w-[13px]" src="public/images/Arrow.png" alt="" /></button>
    
    <section  id="carusel" className="flex z-10 relative top-50 overflow-x-scroll w-329 scrollNone scroll-smooth">
        
      <div className=" mt-20 flex gap-5 p-5"> 
        {Types.map((item, id) => (
          <article className="flex flex-col bg-white items-center justify-between rounded-4xl p-5 w-60 h-90 shadow-xl" key={id}>
            <img className="" src={item.image} alt="" />
            <Link to="/catalog">{item.title}</Link>
          </article>
        ))}
      </div>
      
    </section>
    
    <button onClick={() => carusel.scrollLeft += 1500} className="z-20 cursor-pointer rotate-[180deg] w-15 flex items-center justify-center rounded-full h-15 absolute top-110 right-[-20px] bg-[#ADC178]"> <img className="w-[13px]" src="public/images/Arrow.png" alt="" /></button>
    </>
  );
}

export default Carusel;
