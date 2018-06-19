<div>
							<h1> Signup Form </h1>
							<Form onSubmit={this.handleSubmit} className="login-form">
								<FormItem>
									<Input type="number" name="employee_number" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="employee_number" value={this.props.signupForm.employee_number} onChange={this.handleOnChange} />
								</FormItem>
								<FormItem>
									<Input name="name" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="name" value={this.props.signupForm.name} onChange={this.handleOnChange} />
								</FormItem>
								<FormItem>
									<Input name="gender" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="gender" value={this.props.signupForm.gender} onChange={this.handleOnChange} />
								</FormItem>
								<FormItem>
									<Input name="position" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="position" value={this.props.signupForm.position} onChange={this.handleOnChange} />
								</FormItem>
								<FormItem>
									<Input type="date" name="start_working_date" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="start_working_date" value={this.props.signupForm.start_working_date} onChange={this.handleOnChange} />
								</FormItem>
								<FormItem>
									<Input name="mobile_phone" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="mobile_phone" value={this.props.signupForm.mobile_phone} onChange={this.handleOnChange} />
								</FormItem>
								<FormItem>
									<Input name="email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" value={this.props.signupForm.email} onChange={this.handleOnChange} />
								</FormItem>
								<FormItem>
									<Input name="password" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="password" value={this.props.signupForm.password} onChange={this.handleOnChange} />
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