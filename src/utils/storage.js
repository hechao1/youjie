
const Storage = {
    get:(value) => {
        let val = localStorage.getItem(value)
        try { return JSON.parse(val) }
        catch(e) { return val || undefined }
    },
    set:(key,value) => {
        if (value === undefined) { return }
        localStorage.setItem(key,JSON.stringify(value))
    },
    remove:(key) => {
        localStorage.removeItem(key)
    }
}

export default Storage
