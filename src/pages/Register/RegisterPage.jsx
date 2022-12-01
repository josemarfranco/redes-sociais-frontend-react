import React from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            profilePic: '',
            email: '',
            name: '',
            surname: '',
            dob: '',
            password: '',
            isCreated: false
        }
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    handleFileChange(event) {
        this.setState({[event.target.name]: event.target.files[0]})
    }
    handleSubmit(event) {
        event.preventDefault()
        axios.post("/users/create", this.state, {headers: {'content-type': 'multipart/form-data'}}).then((res) => {
            alert(res.data.message)
            this.setState({isCreated: true})
        }).catch((error) => {
            alert(error.response.data.message)
        })
    }
    render() {
        return (
            <>
                <div className="standard-flex-container">
                    <div className="standard-left-panel"/>
                    <div className="standard-right-panel">
                        <form className="standard-form fade-in" onSubmit={this.handleSubmit}>
                            <h2>Cadastro</h2><br/>
                            <label htmlFor="profilePic">Foto</label><br/>
                            <input name="profilePic" type="file" onChange={this.handleFileChange}/><br/><br/>
                            <label htmlFor="email">Email</label><br/>
                            <input className="standard-input" name="email" type="text" value={this.state.email} onChange={this.handleChange}/><br/><br/>
                            <label htmlFor="name">Nome</label><br/>
                            <input className="standard-input" name="name" type="text" value={this.state.name} onChange={this.handleChange}/><br/><br/>
                            <label htmlFor="surname">Sobrenome</label><br/>
                            <input className="standard-input" name="surname" type="text" value={this.state.surname} onChange={this.handleChange}/><br/><br/>
                            <label htmlFor="dob">Data de nascimento</label><br/>
                            <input className="standard-input" name="dob" type="date" min="1950-01-01" max="2012-01-01" value={this.state.dob} onChange={this.handleChange}/><br/><br/>
                            <label htmlFor="password">Senha</label><br/>
                            <input className="standard-input" name="password" type="password" value={this.state.password} onChange={this.handleChange}/><br/><br/>
                            <label htmlFor="password">Confirmação da senha</label><br/>
                            <input className="standard-input" name="password" type="password" value={this.state.password} onChange={this.handleChange}/><br/><br/>
                            <button className="standard-button" type="submit">Criar conta</button><br/>
                            {this.state.isCreated && <Navigate to="/login"/>}
                            <a href="/"><small>Voltar</small></a>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}