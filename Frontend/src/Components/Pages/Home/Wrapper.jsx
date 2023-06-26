import React from 'react'

function Wrapper(props) {
    const { children } = props;
    return (
        <div>{children}</div>
    )
}

export default Wrapper