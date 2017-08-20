import React from 'react'
import PropTypes from 'prop-types'

// 传递来自于容器组件FilterLink
// link点击 传递 filter的
const Link = ({active,children,onClick}) =>{
    if(active){
        return <span>{children}</span>
    }
    return (
        <a href='#'
            onClick={e=>{
                e.preventDefault()
                onClick()
            }}
        >
            {children}
        </a>
    )
}
Link.propTypes = {
    active:PropTypes.bool.isRequired,
    children:PropTypes.node.isRequired,
    onClick:PropTypes.func.isRequired
}
export default Link