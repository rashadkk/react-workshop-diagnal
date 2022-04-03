import { useRef, useEffect } from 'react';

interface Props {
    src: string,
    alt: string,
    defaultImg?: string,
}

const baseUrl = `${process.env.PUBLIC_URL}/Slices/`;

function LazyImg({ src, defaultImg }: Props) {

    const imgRef = useRef<any>();

    useEffect(() => {
        const imgElement = imgRef.current
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                imgRef.current.src = `${baseUrl}${src}`;
                // setTimeout(()=> {
                //     imgRef.current.src = `${baseUrl}${src}`;
                // }, 500)
            }
        })

        observer.observe(imgRef.current);

        return () => {
            observer.unobserve(imgElement)
        }
    }, [src])
    

  return (
    <div>
        <img 
            src={`${baseUrl}placeholder_for_missing_posters.png`}
            ref={imgRef}
            alt={src}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src= `${baseUrl}${defaultImg || 'No-Image-Placeholder.svg'}`;
            }}
        />
    </div>
  )
}

export default LazyImg;
