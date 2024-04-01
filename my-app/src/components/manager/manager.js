import { Component } from "react"
import './manager.css'
class ManagerOrAndmin extends Component {
	constructor(props){
		super(props)
	}
	state = {
		adress:'',
		date: '',
		income: '',
		name:'',
		monthlyReport: false,
		monthlyIncome: null
	}

	isDateValid = (date) => {
		if (date === ''){
			alert('Введите дату')
			return false
		}
		return true
	}

	onDateChangeAdmin = (e) => {
		let selectedData = new Date(e.target.value)
		let monthlyIncome = this.props.calculateIncome(selectedData.getMonth())
		this.setState({
			monthlyIncome,
			[e.target.name] : e.target.value 
		})
		
	}

	onValueChange = (e) => {
		this.setState({
			[e.target.name] : e.target.value 
		})
		
	}
	
	getReport = () =>{
		if (!this.isDateValid(this.state.date)){
			return
		}
		let {name,adress,income} = this.props.getReport(this.state.date)
		this.setState({
			name,
			adress,
			income
		})
	}

	onClickCallBackAdmin = () => {
		if (!this.isDateValid(this.state.date)){
			return
		}
		this.setState({
			monthlyReport: true
		})
	}

	onClickCallBackManager = () => {
		if (!this.isDateValid(this.state.date)){
			return
		}
		if(this.state.adress==='' || this.state.name==='' || this.state.income===''){
			alert('заполните все поля')
			return
		}
		this.props.onSave(this.state)
	}

	goBack = () =>{
		this.setState({
			monthlyReport: false
		})
	}

	render(){
		let currPage
		let date = new Date().toJSON()
		let dateArr = date.split('-')
		if(this.state.monthlyReport){
			currPage = <MonthlyReport maxDate ={`${dateArr[0]}-${dateArr[1]}`} date = {this.state.date} goBack = {this.goBack} monthlyIncome = {this.state.monthlyIncome} calculateIncome={this.props.calculateIncome}/>
		}
		else{
			let userType = this.props.userType
			let {name, adress, income,date} = this.state
			let buttonText = userType === 'admin' ? 'сводный отчёт за месяц' : 'сохранить отчёт'
			let onClickCallBack = userType === 'admin' ? this.onClickCallBackAdmin : this.onClickCallBackManager
			let onDateChange = userType === 'admin' ? this.onDateChangeAdmin : this.onValueChange
			currPage = (
				<div className = 'wrapper'>
					<div className = "red">{userType}</div>
					<input onChange = {onDateChange}
						placeholder = "введите Дату" 
						type = "date" 
						name = 'date'
						min="2024-01-01" 
						max={`${dateArr[0]}-${dateArr[1]}-${dateArr[2].slice(0,2)}`}
						value = {date}/>
					<input onChange = {this.onValueChange}
						placeholder = "введите ФИО" 
						type = "text" 
						name = 'name'
						value = {name}/>
					<input onChange = {this.onValueChange}
						placeholder = "введите адрес точки" 
						type = "text" 
						name = 'adress'
						value = {adress}/>
					<input onChange = {this.onValueChange}
						placeholder = "введите выручку за день"
						type = "number"
						name = 'income'
						value = {income} />
					<button onClick = {this.getReport} className = "submit">отчёт за выбранный день</button>
					<button onClick = {onClickCallBack}>{buttonText}</button>
					<button onClick={() => this.props.changeUserType('logIn')}>Log Out</button>
				</div>	
			)
		}
		
		return (
			<>
				{currPage}
			</>
		)
	}
	
}



class MonthlyReport extends Component{
	constructor(props){
		super(props)
	}
	state = {
		date: this.props.date,
		monthlyIncome: this.props.monthlyIncome
	}

	onValueChange = (e) => {
		let selectedData = new Date(e.target.value)		
		let monthlyIncome = this.props.calculateIncome(selectedData.getMonth())//
		this.setState({
			monthlyIncome,
			[e.target.name] : e.target.value 
		})
		
	}

	render(){
		let {date} = this.state
		let dateArr = date.split('-')
		return(
			<>
				<div className = 'wrapper'>
					Месячный отчёт о выручке
					<p className="mgb">
						Выручка за 
					</p>
					<input onChange = {this.onValueChange}
						placeholder = "введите Дату" 
						type = "month"
						min="2024-01" 
						max={this.props.maxDate}
						name = 'date'
						value = {`${dateArr[0]}-${dateArr[1]}`}/>
					
					<p>
						{`${this.state.monthlyIncome} $`}
					</p>
					<button onClick={this.props.goBack}>Log Out</button>
				</div>	
			</>
		)
	}
}

export default ManagerOrAndmin