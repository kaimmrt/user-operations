import React from 'react'
import { Button, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import { get, post } from '../networking/Server'

const SignIn = () => {
    const history = useHistory();

    const onFinishFailed = errorInfo => {

    };

    const onFinish = values => {
        get("/api/user", {

        }).then((res) => {
            const a = res.find((value) => value.email == values.email)
            if (a) {
                window.alert('Bu emaile ait kullanıcı bulunmakta')
            }
            else {
                post("/api/user", {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    status: values.status
                }).then(res => {
                    window.alert('Success')
                    history.push('./signin')
                })
            }
        })
    };

    return (
        <div className="auth-container">
            <div className="auth-container-main">

                <h1 className="auth-title">USER OPERATIONS</h1>

                <h3 className="auth-subtitle">SIGN UP</h3>

                <Form
                    initialValues={{ remember: true }}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="auth-form"
                >
                    <Form.Item rules={[{ required: true, message: 'Please enter your first and last name!' }]} name="name" >
                        <Input className="auth-input" placeholder="First and Last Name" />
                    </Form.Item>

                    <Form.Item name="email" rules={[{
                        required: true, type: 'email', message: 'Please enter a valid e-mail address!',
                    }]}>
                        <Input className="auth-input" placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password className="auth-input" placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please re-enter your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password className="auth-input" placeholder="Password Again" />
                    </Form.Item>

                    <Form.Item>

                        <Button className="auth-btn-typ-1" htmlType="submit">
                            Sign Up
                        </Button><span>or </span><span onClick={() => history.push('./signin')} className="auth-link">Sign In</span>
                    </Form.Item>

                </Form>


            </div>
        </div>
    )
}

export default SignIn
