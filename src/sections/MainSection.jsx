import React, { useRef, useState, useEffect } from "react";
import { companyNames } from "../constants";
import gsap from "gsap";

const MainSection = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const clientPreview = useRef(null);
  const imgWrapperRef = useRef(null);
  const imgRef = useRef(null);
  const tlRef = useRef(null);

  // Ensure refs point to real DOM nodes after mount
  useEffect(() => {
    // Create a baseline timeline (optional)
    tlRef.current = gsap.timeline({ paused: true });
    // Ensure the wrapper and image start hidden / clipped
    if (imgWrapperRef.current) {
      gsap.set(imgWrapperRef.current, {
        clipPath: "polygon(50% 50%,50% 50%,50% 50%,50% 50%)",
      });
    }
    if (imgRef.current) {
      gsap.set(imgRef.current, { opacity: 0, scale: 1.25 });
    }
    return () => {
      // cleanup any running tweens
      gsap.killTweensOf([imgWrapperRef.current, imgRef.current]);
    };
  }, []);

  // Animate when activeIndex changes
  useEffect(() => {
    const wrapper = imgWrapperRef.current;
    const img = imgRef.current;

    // stop previous tweens
    gsap.killTweensOf([wrapper, img]);

    if (activeIndex === -1) {
      // hide / collapse
      if (wrapper) {
        gsap.to(wrapper, {
          clipPath: "polygon(50% 50%,50% 50%,50% 50%,50% 50%)",
          duration: 0.45,
          ease: "power2.inOut",
        });
      }
      if (img) {
        gsap.to(img, { opacity: 0, duration: 0.2, ease: "power2.in" });
      }
      return;
    }

    // set source (public folder: use leading slash)
    if (img) {
      img.src = `/img${activeIndex + 1}.jpg`;
      // prepare state
      gsap.set(img, { opacity: 0, scale: 1.25 });
    }

    // open clip and fade in image
    if (wrapper) {
      gsap.to(wrapper, {
        clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (img) {
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
      });
    }
  }, [activeIndex]);

  return (
    <section className="relative w-full h-svh p-8 flex flex-col justify-end items-start gap-8 overflow-hidden">
      {/* Preview container */}
      <div
        ref={clientPreview}
        className="fixed inset-0 h-screen w-screen z-0 pointer-events-none"
      >
        {/* Single wrapper + img used for all previews */}
        <div
          ref={imgWrapperRef}
          className="absolute top-0 left-0 w-full h-full overflow-hidden will-change-[clip-path]"
          style={{
            clipPath: "polygon(50% 50%,50% 50%,50% 50%,50% 50%)",
          }}
        >
          <img
            ref={imgRef}
            src=""
            alt=""
            className="relative w-full h-full object-cover will-change-transform"
          />
        </div>
      </div>

      <div>
        <h3 className="relative text-[#acacac] z-10">Trusted Us</h3>
      </div>

      {/* Client list */}
      <div className="relative lg:w-[80%] mb-32 flex flex-wrap justify-start gap-3 mix-blend-difference z-20 w-full">
        {companyNames.map((company, index) => (
          <h1
            key={company.id}
            className="cname relative inline-block cursor-pointer"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            {company.name}
          </h1>
        ))}
      </div>
    </section>
  );
};

export default MainSection;
