import { useEffect, useRef, useCallback } from 'react';

import { fetchContents } from '../../store/actions/contents-actions';
import { setPageNumber } from '../../store/reducers/contents-slice'
import { useAppSelector, useAppDispatch  } from '../../store/hooks';

import ContentCard from '../../components/ContentCard/ContentCard';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import { Content } from '../../types';


function Contents() {

    const { contents, pageNumber, hasMore, loading} = useAppSelector(state => state.contents);
    const dispatch = useAppDispatch();
  
    const observer = useRef<any>();

    const lastContentRef = useCallback((node: HTMLDivElement) => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting && hasMore) {
                dispatch(setPageNumber(pageNumber + 1))
            }
        })

        if(node) observer.current.observe(node);
    },[loading, hasMore])

    useEffect(() => {
        dispatch(fetchContents(pageNumber));
    }, [pageNumber]);
    
    return (
        <>
            <ContentHeader />
            <div className="container">
                <div className="row">
                {
                    contents.map((content: Content, i: number) =>  (
                        <div ref={contents.length === i+ 1 ? lastContentRef: null } key={`${content.name}-${i}`} className="col-4 col-md-3 col-lg-2 mb-4">
                            <ContentCard content={content} />
                        </div>
                    ))
                }
                {
                    (contents.length === 0 && !loading) &&
                    (<p className="text-center py-5">No result found</p>)
                }
                </div>
            </div>
        </>
    )
}

export default Contents 