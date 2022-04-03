import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content } from '../../types';

export interface ContentsState {
    contentTitle: string,
    contents: Array<Content>,
    contentsOriginalList: Array<Content>,
    loading: boolean,
    pageNumber: number,
    totalContentsCount: number,
    hasMore: boolean,
    searchKeyword: string,
  }
  
  const initialState: ContentsState = {
    contentTitle: '',
    loading: true,
    pageNumber: 1,
    contents: [],
    contentsOriginalList: [],
    totalContentsCount: 0,
    hasMore: false,
    searchKeyword: '',
  };


export const contentSlice = createSlice({
    name: 'contents',
    initialState,
    reducers: {
        clearContents: (state) => {
            state.contents = [];
        },
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setContentsCount: (state, action: PayloadAction<number>) => {
            state.totalContentsCount = action.payload
        },
        onSearch: (state, action: PayloadAction<string>) => {
            state.searchKeyword = action.payload;
            if(action.payload === '') {
                state.contents = state.contentsOriginalList.slice();
            }else {
                state.contents = state.contentsOriginalList.filter(c => 
                   c.name.toLowerCase().includes(state.searchKeyword.toLowerCase())
                )
            }
        },
        setContentTitle: (state, action: PayloadAction<string>) => {
            state.contentTitle = action.payload;
        },
        loadContents: (state, action: PayloadAction<any>) => {
            state.contents.push(...action.payload);
            state.contentsOriginalList.push(...action.payload);
            state.hasMore = state.contents.length < state.totalContentsCount;
        }
    }
})

export const { loadContents, setContentsCount, clearContents, setLoading, setPageNumber, setContentTitle, onSearch } = contentSlice.actions;

export default contentSlice.reducer;
