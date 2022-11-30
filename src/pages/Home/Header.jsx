import React from 'react'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout() {
        localStorage.removeItem('OI TERINHA!')
    }
    render() {
        return (
            <>
                <header className="fade-in">
                    <div className="header-left">
                        <input className="standard-input" type="text" placeholder="Busca"/>
                    </div>
                    <div className="header-right">
                        <a href="/login" onClick={this.handleLogout}>Sair</a>
                        <a href="https://giphy.com/gifs/masterchefbr-help-masterchef-vxdhxk40EKRHpRbeSp" rel="noopener noreferrer" target="_blank">Ajuda</a>
                    </div>
                </header>
            </>
        )
    }
}