import React, { ChangeEvent, useRef, useState } from 'react';
import './Search.css';

interface SearchProps {
    value: string,
    onChange: (value: string) => void,
    placehodler?: string
}

function Search({ value, placehodler, onChange }: SearchProps) {
    const [focus, setFocus] = useState(false)
    const inputRef = useRef<any>();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    const focusHandler = () => {
        // setFocus(true);
    }

    const onBlurHandker = () => {
        if(!value) setFocus(false);
    }

    const makeInputVisble = () => {
        inputRef.current.focus();
        setFocus(true);
    }
    return (
        <div className="position-relative w-50">
            <input
                ref={inputRef}
                className="form-control search-input"
                placeholder={placehodler || 'Search...'}
                type="text" value={value} 
                onChange={onChangeHandler}
                onFocus={focusHandler}
                onBlur={onBlurHandker}
                style={{
                    width: focus ? '100%': 0
                }}
            />
            <img className="search-icon" src="/Slices/search.png" alt="search" width={25} onClick={makeInputVisble} />
        </div>
    )
}

export default Search