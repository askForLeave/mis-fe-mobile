import React, {Component} from 'react';


export default class ReviewList extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div>Hello review</div>
        );
    }
}