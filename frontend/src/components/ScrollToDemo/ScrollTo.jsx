import { useEffect, useRef, useState } from 'react'
import './scrollTo.css'

const Scroll = () => {
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const section4Ref = useRef(null);
    const [items, setItems] = useState([])
    const [selected, setSelected] = useState([]);
    const [isOpen, setIsOpen] = useState(false)


    const toggleOpen = () => {
        setIsOpen(!isOpen);
      };

    const toggleItem = (value) => {
        if (selected.includes(value)) {
          setSelected(selected.filter(item => item !== value));
        } else {
          setSelected([...selected, value]);
        }
      };
    
    useEffect(() => {
        setItems([
            { label: 'd', value: 'd'}, 
            { label: 'a', value: 'a'}, 
            { label: 'b', value: 'b'}, 
            { label: 'c', value: 'c'}])
    }, [])
    

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({behavior: "smooth"})
    }

	return (
 
  	 <div className="container3">
      {isOpen ? (
        <div>
          {items.map(item => (
            <div key={item.value}>
              <input
                type="checkbox"
                value={item.value}
                checked={selected.includes(item.value)}
                onChange={() => toggleItem(item.value)}
              />
              <label>{item.label}</label>
            </div>
          ))}
          <button onClick={toggleOpen}>Close</button>
        </div>
      ) : (
        <div>
          <p>{selected.join(', ')}</p>
          <button onClick={toggleOpen}>Open</button>
        </div>
      )}



      <div className="menu">
        <button onClick={()=> scrollToSection(section1Ref)}>Section 1</button>
        <button onClick={() => scrollToSection(section2Ref)}>Section 2</button>
        <button onClick={() => scrollToSection(section3Ref)}>Section 3</button>
        <button onClick={() => scrollToSection(section4Ref)}>Section 4</button>
      </div>
  	  <h1>Page Title</h1>
      <h2 id="section1" ref={section1Ref}>Section 1</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <h2 ref={section2Ref}>Section 2</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <h2 ref={section3Ref}>Section 3</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <h2 ref={section4Ref}>Section 4</h2>
       <p>
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
       </p>


  	<div className="container2">
      <button className='cta'>CTA BUTTON</button>
  	</div>

  	</div>
  )
}


export default Scroll