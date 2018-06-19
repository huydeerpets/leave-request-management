import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { pendingFetchData } from '../store/Actions/supervisorActions'
import { Layout, Form, Table, Divider, Icon, Input, Button, Menu, Breadcrumb } from 'antd';
const { Header, Footer, Content } = Layout;

class SuperPage extends Component {
	constructor(props) {
		super(props)

		this.columns = [{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		}, {
			title: 'Position',
			dataIndex: 'position',
			key: 'position',
		}, {
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
		}, {
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span>
					<Button
						onClick={
							() => {
								// console.log(this.props,'sAs')
								this.editUser(this.props.users, record.id)
							}
						}
						type='primary'> Edit Role</Button>
					<Divider type="vertical" />
				</span>
			),
		}];
	}
	editUser = (users, userId) => {
		console.log(userId, '--', users)
		this.props.history.push({ pathname: '/edituser/' + userId, state: { users: users } })
	}
	componentDidMount() {
		if (localStorage.getItem('role') !== 'supervisor') {
			this.props.history.push('/')
		}
		this.props.pendingFetchData()
	}
	render() {
		if (this.props.loadingPending) {
			return (<h1> loadingPending... </h1>)
		} else {
			return (
				<Layout>
					<Header>
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={['1']}
							style={{ lineHeight: '64px' }}
						>
							<Menu.Item key="1">
								<NavLink to="/">Home</NavLink>
							</Menu.Item>
							<Menu.Item key="2">
								<NavLink to="/login">Login</NavLink>
							</Menu.Item>
							<Menu.Item key="3">
								<Button
									onClick={
										() => {
											localStorage.clear()
											this.props.history.push('/')
										}
									}
									type='danger' ghost>Logout</Button>
							</Menu.Item>
						</Menu>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between'
							}}>
						</div>
					</Header>

					<Content
						className="container" style={{ display: 'flex', margin: '24px 16px 0', justifyContent: 'space-around', paddingBottom: '336px' }}>
						<div style={{ padding: 150, background: '#fff', minHeight: 360 }}>
							<Table
								columns={this.columns}
								dataSource={this.props.users}>
							</Table>
						</div>
					</Content>
					<Footer style={{ background: 'grey' }}>
						<p>
							<a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The website content
							is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
						</p>
					</Footer>
				</Layout>
			)
		}
	}
};

const mapStateToProps = state => ({
	// loadingPending: state.supervisorReducer.loadingPending,
	users: state.supervisorReducer.usersPending
})

const mapDispatchToProps = dispatch => (bindActionCreators({
	pendingFetchData,	
}, dispatch))

console.log(mapStateToProps)
export default connect(mapStateToProps, mapDispatchToProps)(SuperPage)

