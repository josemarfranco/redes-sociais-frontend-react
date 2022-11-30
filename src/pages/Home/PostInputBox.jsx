import axios from 'axios'
import React from 'react'

export default class PostInputBox extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            inputPost: ''
        }
    }
    handleChange(event) {
        this.setState({inputPost: event.target.value})
    }
    handleSubmit(event) {
        const authHeader = `Bearer ${localStorage.getItem('OI TERINHA!')}`
        event.preventDefault()
        axios.post('/posts/create', {
            content: this.state.inputPost
        }, {
            headers: {'Authorization' : authHeader}
        }).then(() => {
            alert('Post criado!')
            this.setState({
                inputPost: ''
            })
        }).catch((error) => {
            this.setState({
                error: <small className="red">{error.response.data.message}</small>,
                inputPost: ''
            })
        })
    }
    render() {
        return (
            <>
                <form className="post-input-box" onSubmit={this.handleSubmit}>
                    <label htmlFor="content">Qual é a polêmica de hoje?</label>
                    <input className="post-input" name="content" type="text" value={this.state.inputPost} onChange={this.handleChange}/>
                    <button className="standard-button" type="submit">Postar</button>
                </form>
            </>
        )
    }
}