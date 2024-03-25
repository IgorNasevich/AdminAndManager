const Admin = (props) => {
	return (
		<>
			<div className="red">admin</div>
			<button onClick={()=>props.changeUserType('logIn')}>Log Out</button>
		</>
	)
}

export default Admin