const Manager = (props) => {
	return (
		<>
			<div className="red">Manager</div>
			<button onClick={()=>props.changeUserType('logIn')}>Log Out</button>
		</>
		
	)
}

export default Manager