import React, { useEffect } from 'react'
import { Button, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import { get } from '../networking/Server'
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../appRedux/actions/Auth";

const SignIn = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const authUser = useSelector(({ auth }) => auth.authUser);

    const onFinishFailed = errorInfo => {

    };

    const onFinish = values => {
        get("/api/user", {

        }).then((res) => {
            const a = res.find((value) => value.email == values.email)
            if (a) {
                if (a.password == values.password) {
                    localStorage.setItem("authUser", a)
                    localStorage.setItem("email", a.email)
                    get(`/api/user/${a.id}`).then((res) => {
                        dispatch(setAuthUser(res))
                    })
                }
                else
                    window.alert('Wrong password')
            }
            else
                window.alert('User not found')
        })
    };

    useEffect(() => {
        if (authUser != null) {
            history.push('/');
        }
    }, [authUser]);


    return (
        <div className="auth-container">
            <div className="auth-container-main">

                <h1 className="auth-title">USER OPERATIONS</h1>

                <h3 className="auth-subtitle">SIGN IN</h3>

                <Form
                    initialValues={{ remember: true }}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="auth-form"
                >
                    <Form.Item
                        rules={[{ required: true, message: 'Please enter a valid e-mail address!' }]} name="email">
                        <Input placeholder="Email" className="auth-input" />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Please enter your password!' }]} name="password">
                        <Input type="password" placeholder="Password" className="auth-input" />
                    </Form.Item>


                    <Form.Item>

                        <Button className="auth-btn-typ-1" htmlType="submit">
                            Sign in
                        </Button><span>or </span><span onClick={() => history.push('./signup')} className="auth-link">Sign Up</span>
                    </Form.Item>

                </Form>


            </div>
        </div>
    )
}

export default SignIn
