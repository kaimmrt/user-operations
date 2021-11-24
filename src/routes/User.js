import React, { useState, useEffect } from 'react'
import { get, put } from '../networking/Server'
import { Input, Form, Button } from 'antd'
import { useParams, useHistory } from 'react-router-dom'

const UserList = () => {
    const { id } = useParams()
    const [data, setData] = useState("")
    const history = useHistory()

    const FetchUser = () => {
        get(`/api/user/${id}`)
            .then(res => setData(res))
    }

    const UpdateUser = (values) => {
        put(`/api/user/${id}`, {
            name: values.name,
            email: values.email,
            password: values.password
        }).then((res) => {
            window.location.reload()
        })

    }

    useEffect(() => {
        FetchUser()
    }, [])

    const onFinishFailed = errorInfo => {

    };

    const onFinish = values => {
        UpdateUser(values)
    };

    if (data == "")
        return <div className="container">Loading...</div>
    return (
        <div className="container">
            <Button className="auth-btn-typ-3" onClick={() => history.push('../sample')}>Back to user list</Button>
            <Form
                initialValues={{ name: data.name, email: data.email, password: data.password }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="auth-form"
            >
                <Form.Item name="name">
                    <Input placeholder="Name" className="auth-input" />
                </Form.Item>
                <Form.Item name="email">
                    <Input value={data.email} placeholder="Email" className="auth-input" />
                </Form.Item>
                <Form.Item name="password">
                    <Input value={data.password} placeholder="Password" className="auth-input" />
                </Form.Item>

                <Form.Item>
                    <Button className="auth-btn-typ-2" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}

export default UserList
