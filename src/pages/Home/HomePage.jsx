import React from 'react'
import axios from 'axios'
import Header from './Header'
import GeneralFeed from './GeneralFeed'
import CardsPanel from './CardsPanel'
import profileDefaultImage from '../../images/default.png'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            surname: '',
            profilePic: profileDefaultImage
        }
    }
    componentDidMount() {
        this.showProfile()
    }
    showProfile() {
        const authHeader = `Bearer ${localStorage.getItem('OI TERINHA!')}`
        axios.get("/users/me", {headers: {'Authorization' : authHeader}}).then((res) => {
            this.setState(res.data)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }
    render() {
        return (
            <>
                <Header />
                <div className="homepage-flex-container fade-in">
                    <div className="profile">
                        <img className="profile-picture" width="200" height="200" src={this.state.profilePic} alt={this.state.name}/>
                        <h2>{this.state.name}</h2>
                        <h2>{this.state.surname}</h2>
                        <div className="profile-panel">
                            
                        </div>
                    </div>
                    <GeneralFeed />
                    <CardsPanel />
                </div>
            </>
        )
    }
}