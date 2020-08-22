import React from 'react';

class Form extends React.Component {
    //userNameInput = React.createRef();
    //<input type="text" placeholder="GitHub username" ref={this.userNameInput} required/>
    state = { userName: '' };
    handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`https://api.github.com/users/${this.state.userName}`);
        const json = await response.json();

        this.props.onSubmit(json);
        this.setState({ userName:''} );
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>                
                <input 
                    type="text" 
                    placeholder="GitHub username" 
                    value={this.state.userName} 
                    onChange={event => this.setState({ userName: event.target.value})} 
                    required 
                />
                <button>Add card</button>
            </form>
        );
    }
}

export default Form;
