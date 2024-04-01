import {Component} from "react";

import './logIn.css'

class LogIn extends Component {
	constructor(props){
		super(props)
	}

	state = {
		loginManager: 'man',
		passwordManager: '1234',
		loginAdmin: 'admin',
		passwordAdmin:'1111',
		login:'',
		password:''
	}

	onSubmit = () => { 
		if(this.state.login === this.state.loginAdmin && this.state.password === this.state.passwordAdmin){
			this.props.changeUserType('admin')
		}
		else if(this.state.login === this.state.loginManager && this.state.password === this.state.passwordManager){
			this.props.changeUserType('manager')
		}
		else{
			alert('Неправильный логин или пароль')
			
		}
		
	}

	onValueChange = (e) => {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	
	render(){
		return(
			<div className='wrapper'>
				<input onChange = {this.onValueChange}
				 	placeholder="введите логин" 
					type="text" 
					name = 'login'/>
				<input onChange = {this.onValueChange}
					placeholder = "введите пароль"
				 	type="text"
					name = 'password' />
				<button onClick = {this.onSubmit} className="submit">войти</button>
			</div>
		)
	}
	
}
	


	
	


export default LogIn