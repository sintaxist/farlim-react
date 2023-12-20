import React, { useEffect, useState } from 'react'
import { OverlayLoading } from '../utils/UseElements'

export const OverlayLoader = ({loading}) => {

    const [show, setShow] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false)
        }, 200);

        loading && clearTimeout(timer);

    },[loading])

    return (
        show &&
        <OverlayLoading loading={loading.toString()}>
            <img src="/logo512.png" alt="" />
        </OverlayLoading>
    )
}
