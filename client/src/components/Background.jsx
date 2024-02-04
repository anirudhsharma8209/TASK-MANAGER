import React, { Fragment } from 'react'

const Background = () => {
    return (
        <Fragment>            
            <div className='fixed border h-[100vh] w-[100vw] bg-slate-800 text-9xl text-center'>
                <div className="font text-lg font-semibold mt-5">Document.</div>
                <p className='translate-y-40 text-slate-900 text-slate'>DOCS</p>                
            </div>
        </Fragment>
    )
}

export default Background