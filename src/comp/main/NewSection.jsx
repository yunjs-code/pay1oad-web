import React, { useEffect, useRef, useState } from "react";
import "./NewSection.css"; // CSS 파일 임포트

function NewSection() {
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && textRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const sectionHeight = sectionRef.current.getBoundingClientRect().height;

        if (sectionTop < window.innerHeight && sectionTop + sectionHeight > 0) {
          const scrollProgress = (window.innerHeight - sectionTop) / window.innerHeight;
          textRef.current.style.backgroundPosition = `${100 - scrollProgress * 100}% 0`;

          if (scrollProgress >= 1) {
            textRef.current.classList.add("fully-visible");
            setIsScrolling(false);
          } else {
            textRef.current.classList.remove("fully-visible");
            setIsScrolling(true);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="new-section" ref={sectionRef}>
      <div ref={textRef} className={`info-text ${isScrolling ? '' : 'fully-visible'}`}>
      Pay1oad는 어떤 동아리인가요
      </div>
    </div>
  );
}

export default NewSection;
