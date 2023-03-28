import { useState, useEffect } from "react";

type GuestCartType = {
    itemId: number,
    quantity: number,
}

export const useLocalStorage = () => {
    const [storageData, setStorageData] = useState<GuestCartType[]>([])

    const reloadStorage = () => {
        if (typeof window !== undefined) {
            const storageData = window.localStorage.getItem('GuestCart')
            if (storageData !== null) {
                setStorageData(JSON.parse(storageData))
            } else {
                setStorageData([])
            }
        } else {
            return
        } 
    }
    useEffect(() => {
        reloadStorage()
    }, [])

    return { storageData, reloadStorage }
}
