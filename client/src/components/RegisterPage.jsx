import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { formOnchange, SumbitSignUp } from '../store/Actions/signupActions'

import { Layout, Form, Icon, Input, Select, Button, Menu, Breadcrumb } from 'antd';
const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class Landingpage extends Component {
	componentDidMount() {
		if (localStorage.getItem('token') && localStorage.getItem('role') === 'admin') {
			this.props.history.push('/admin')
		} else if (localStorage.getItem('token') && localStorage.getItem('role') === 'director') {
			this.props.history.push('/director')
		} else if (localStorage.getItem('token') && localStorage.getItem('role') === 'supervisor') {
			this.props.history.push('/supervisor')
		} else if (localStorage.getItem('token') && localStorage.getItem('role') === 'employee') {
			this.props.history.push('/employee')
		}
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.SumbitSignUp(this.props.signupForm)
	}
	handleOnChange = e => {
		let newUser = {
			...this.props.signupForm,
			[e.target.name]: e.target.value
		}
		this.props.formOnchange(newUser)
	}

	handleOnChangeSelect = (value, event) => {
        
	}

	render() {
		return (
			<div>
				<Layout>
					<Header >
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={['1']}
							style={{ lineHeight: '64px' }} >
							<Menu.Item key="1">
								<NavLink to="/">Home</NavLink>
							</Menu.Item>
							<Menu.Item key="2">
								<NavLink to="/login">Login</NavLink>
							</Menu.Item>
							<Menu.Item key="3">
								<NavLink to="/register">Register</NavLink>
							</Menu.Item>
						</Menu>
					</Header>

					<Content className="container" style={{ display: 'flex', margin: '24px 16px 0', justifyContent: 'space-around', paddingBottom: '160px' }}>
						<div style={{ padding: 150, background: '#fff', minHeight: 360 }}>

							<h1> Register Form </h1>
							<div>
								<Form onSubmit={this.handleSubmit} className="login-form">
									<FormItem>
										<Input type="number"
											id="employee_number"
											name="employee_number"
											placeholder="employee_number"
											prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
											value={this.props.signupForm.employee_number}
											onChange={this.handleOnChange} />
									</FormItem>
									<FormItem>
										<Input type="number"
											id="name"
											name="name"
											placeholder="name"
											prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
											value={this.props.signupForm.name}
											onChange={this.handleOnChange} />
									</FormItem>
									<FormItem>
										<Select 											
											showSearch
											style={{ width: 200 }}
											placeholder="Select your gender">
											<Option value="male">Male</Option>
											<Option value="female">Female</Option>
										</Select>
										<Input name="gender" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="gender" value={this.props.signupForm.gender} onChange={this.handleOnChange} />										
									</FormItem>
									<FormItem>
										<Input name="position" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="position" value={this.props.signupForm.position} onChange={this.handleOnChange} />
									</FormItem>
									<FormItem>
										<FormItem>
											<Input type="date" name="start_working_date" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="start_working_date" value={this.props.signupForm.start_working_date} onChange={this.handleOnChange} />
										</FormItem>
										<Input name="mobile_phone" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="mobile_phone" value={this.props.signupForm.mobile_phone} onChange={this.handleOnChange} />
									</FormItem>
									<FormItem>
										<Input name="email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" value={this.props.signupForm.email} onChange={this.handleOnChange} />
									</FormItem>
									<FormItem>
										<Input type="password" name="password" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="password" value={this.props.signupForm.password} onChange={this.handleOnChange} />
									</FormItem>
									<FormItem>
										<Input name="role" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="role" value={this.props.signupForm.role} onChange={this.handleOnChange} />
									</FormItem>
									<FormItem>
										<Input type="number" name="supervisor_id" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="supervisor_id" value={this.props.signupForm.supervisor_id} onChange={this.handleOnChange} />
									</FormItem>
									<FormItem>
										<Button onClick={this.handleSubmit} htmlType="submit" type="primary"> Sign-up</Button>
									</FormItem>
								</Form>
							</div>

						</div>

					</Content>

					<Footer style={{ textAlign: 'center' }}>
						<p>
							<a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The website content
							is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
						</p>
					</Footer>
				</Layout>
			</div>
		)
	}

};

const mapStateToProps = state => ({
	signupForm: state.signupReducer
})

const mapDispatchToProps = dispatch => (bindActionCreators({
	formOnchange,
	SumbitSignUp,
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Landingpage)