import { Component } from 'react';

import LogIn from '../logIn/logIn';
import Admin from '../admin/admin';
import Manager from '../manager/manager';

class App extends Component{
	
	state = {
		userType: 'logIn'
	}

	changeUserType = (value) => {
		this.setState({
			userType: value
		})
	}

	render(){
		let currPage

		if(this.state.userType === 'logIn'){
			currPage = <LogIn changeUserType = {this.changeUserType}/>
		}
		if(this.state.userType === 'admin'){
			currPage = <Admin changeUserType = {this.changeUserType}/>
		}
		if(this.state.userType === 'manager'){
			currPage = <Manager changeUserType = {this.changeUserType}/>
		}

		return(
			<div className="app">
				{currPage}
			</div>
		)
	}
	
	
}


export default App;
