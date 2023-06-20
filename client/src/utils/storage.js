// Set Session Token
export const setSessionToken = (name, token) => {
    return sessionStorage.setItem(name, JSON.stringify(token))
}

// Get Session Token
export const getSessionToken = (type) => JSON.parse(sessionStorage.getItem(type))

// Remove Session Token
export const removeSessionToken = (type) => sessionStorage.clear(type)

// Clear Session Storage
export const clearStorage = () => sessionStorage.clear()