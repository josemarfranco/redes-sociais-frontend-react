import React from 'react'
import axios from 'axios'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this) 
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault()
        axios.post('/login', this.state).then((res) => {
            localStorage.setItem('OI TERINHA!', res.data.jwt)
            window.location.reload()
        }).catch((error) => {alert(error.message)})
    }
    render() {
        return (
            <>
                <div className="standard-flex-container">
                    <div className="standard-left-panel"/>
                    <div className="standard-right-panel">
                    <form className="standard-form fade-in" onSubmit={this.handleSubmit}>
                        <label htmlFor="email">Email</label><br/>
                        <input className="standard-input" name="email" type="text" value={this.state.email} onChange={this.handleChange}/><br/><br/>
                        <label htmlFor="password">Senha</label><br/>
                        <input className="standard-input" name="password" type="password" value={this.state.password} onChange={this.handleChange}/><br/><br/>
                        <a href="/register"><small>Criar conta</small></a><br/>
                        <a href="https://giphy.com/gifs/se-fudeu-fodeu-Y4c8GgvNh7BiBbv8fp" rel="noopener noreferrer" target="_blank"><small>Esqueci minha senha</small></a><br/>
                        <button className="standard-button" type="submit">Login</button>
                    </form>
                    </div>
                </div>
            </>
        )
    }
}