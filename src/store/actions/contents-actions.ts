import { loadContents, setContentsCount, setLoading, setContentTitle } from '../reducers/contents-slice';


export const fetchContents = (page: number) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const response = await fetch(`API/CONTENTLISTINGPAGE-PAGE${page}.json`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        dispatch(setContentsCount(data?.page['total-content-items']))
        dispatch(loadContents(data?.page['content-items']?.content));
        dispatch(setContentTitle(data?.page?.title))
        dispatch(setLoading(false));
    } catch (error) {
        console.log('in error', error);
        dispatch(setLoading(false));
    }
}

