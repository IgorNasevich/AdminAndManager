import { Component } from 'react';

import LogIn from '../logIn/logIn';

import ManagerOrAndmin from '../manager/manager';

class App extends Component{
	
	state = {
		userType: 'logIn',
		reports: null
	}

	changeUserType = (value) => {
		this.setState({
			userType: value
		})
	}

	onSave = ({adress, date, income, name}) => {
		let dateArr = date.split('-')
		let month = (dateArr[1][0] === '0' ? dateArr[1][1] : dateArr[1]) - 1
		let day = (dateArr[2][0] === '0' ? dateArr[2][1] : dateArr[2]) - 1
		if(month === new Date().getMonth()){
			this.setState(state => {
				let newReports = [...state.reports]
				newReports[month] = [...newReports[month]]
				newReports[month][day] = {
					name,
					adress,
					income: +income
				}
				return {
					reports: newReports
				}
	
			})
		}
		else{
			alert('вы можете изменять отчёты только за текущий месяц')
		}
	}

	getReport = (date) => {
		let dateArr = date.split('-')
		let month = (dateArr[1][0] === '0' ? dateArr[1][1] : dateArr[1]) - 1
		let day = (dateArr[2][0] === '0' ? dateArr[2][1] : dateArr[2]) - 1
		return this.state.reports[month][day]
	}

	createData = () =>{
		Date.prototype.daysInMonth = function(x) {
			return 33 - new Date(this.getFullYear(), x, 33).getDate();
		};
		let data = []
		for (let i = 0 ; i < new Date().getMonth()+1; i++){
			let date = new Date()

			let daysInMonth = i === new Date().getMonth() ? new Date().getDay() : date.daysInMonth(i)
			data.push([])
			for (let j = 0; j < daysInMonth; j++){
					data[i].push({
						name: `человек ${i}-${j}`,
						adress: `улица ${i}-${j}`,
						income: i*10 +j
					})
			}
		}
		this.setState({
			reports: data
		})
	}

	calculateIncome = (month) => {
		let acc = 0
		this.state.reports[month].forEach(item => acc += item.income)
		return acc
	}

	render(){
		if (!this.state.reports){
			this.createData()
		}


		let currPage

		if(this.state.userType === 'logIn'){
			currPage = <LogIn changeUserType = {this.changeUserType}/>
		}
		if(this.state.userType === 'manager' || this.state.userType === 'admin'){
			currPage = <ManagerOrAndmin changeUserType = {this.changeUserType} 
										onSave = {this.onSave} 
										getReport = {this.getReport} 
										userType = {this.state.userType} 
										calculateIncome = {month => this.calculateIncome(month)}
										/>
		}

		return(
			<div className="app">
				{currPage}
			</div>
		)
	}
	
	
}


export default App;
