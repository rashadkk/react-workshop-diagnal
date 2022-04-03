import Search from '../Search/Search';
import { onSearch } from '../../store/reducers/contents-slice';
import { useAppSelector, useAppDispatch  } from '../../store/hooks';

import './ContentHeader.css';

const baseUrl = `${process.env.PUBLIC_URL}/Slices/`;

function ContentHeader() {
    const contentTitle = useAppSelector(state => state.contents.contentTitle)
    const keyword = useAppSelector(state => state.contents.searchKeyword);
    const dispatch = useAppDispatch();

    return (
        <div className="content-header d-flex justify-content-between px-3 py-4">
            <div className="d-flex align-items-center">
                <img className="" src={`${baseUrl}Back.png`} alt="search" width={20} />
                <h1 className="h6 ms-3 mb-0">{contentTitle}</h1>
            </div>
            <Search
                value={keyword}
                onChange={(value: string) => {
                    // Debounce can be implement here                    
                    dispatch(onSearch(value))
                }}
            />
        </div>
  )
}

export default ContentHeader;
