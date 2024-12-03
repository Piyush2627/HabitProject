import { useEffect, useState, useRef } from "react";

const InViewComponent = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }, // Trigger when 10% of the component is in view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${
        isInView
          ? "p-5 motion-delay-1500 motion-safe:motion-preset-slide-left-sm"
          : "p-5"
      }`}
    >
      <h1>{isInView ? "I'm in view!" : "I'm out of view!"}</h1>
    </div>
  );
};

export default InViewComponent;
