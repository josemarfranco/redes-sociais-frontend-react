import React from 'react'
import axios from 'axios'
import PostInputBox from './PostInputBox'
import profileDefaultImage from '../../images/default.png'

export default class GeneralFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                _id: '',
                name: '',
                profilePic: profileDefaultImage,
                content: '',
                date: ''
            }]
        }
    }
    componentDidMount() {
        this.renderPosts()
    }
    componentDidUpdate() {
        this.renderPosts()
    }
    renderPosts() {
        const authHeader = `Bearer ${localStorage.getItem('OI TERINHA!')}`
        axios.get("/queries/generalfeed", {headers: {'Authorization' : authHeader}}).then((res) => {
            this.setState(res)
        }).catch((error) => (error.message))
    }
    render() {
        function formatDate(date) {
            const formattedDate = new Date(date)
            const [day, month, hours, minutes] = [
                formattedDate.getDate(),
                formattedDate.getMonth(),
                formattedDate.getHours(),
                formattedDate.getMinutes()
            ]
            if (new Date()) {
                return <small>{hours}:{minutes}</small>
            } else if (new Date() - 1) {
                return <small>{hours}:{minutes} (Ontem)</small>
            } else {
                return <small>{hours}:{minutes} ({day}/{month})</small>
            }
        }
        const renderedPost = this.state.data.map((post) => (
            <div key={post._id} className="post fade-in">
                <div className="post-profile-picture">
                    <img width="100" height="100" src={post.profilePic} alt={post.name}/>
                    <div className="post-profile">
                        {formatDate(post.date)}
                    </div>
                </div>
                <div className="post-profile-content"> 
                    <h3>{post.name}</h3>
                    <p>{post.content}</p>
                </div>
            </div>
        ))
        return (
            <>
                <div className="generalfeed">
                    <PostInputBox />
                    {renderedPost}
                </div>
            </>
        )
    }
}