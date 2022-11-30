import React from 'react'
import PeopleCards from './PeopleCards'

export default class CardsPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <> 
                <div className="cards">
                    <PeopleCards />
                </div>
            </>
        )
    }
}