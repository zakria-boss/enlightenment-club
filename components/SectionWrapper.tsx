import { ReactNode } from "react";

type SectionWrapperProps = {
    id: string;
    className?: string;
    childClass?: string;
    backgroundImage?: string;
    children: ReactNode;
  };

  function SectionWrapper({
    id,
    className,
    backgroundImage,
    children,
    childClass,
  }: SectionWrapperProps): JSX.Element {
    return (
      <section
        id={id}
        className={`pt-10 pb-1 shadow-xl ${className}`}
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${childClass}`}>
          {children}
        </div>
      </section>
    );
  }

export default SectionWrapper;
