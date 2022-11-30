import jwt_decode from 'jwt-decode'

export default function checkAuth() {
    try {
        const webtoken = localStorage.getItem('OI TERINHA!')
        jwt_decode(webtoken, {header: true})
        return true
    } catch {
        return false
    }
}