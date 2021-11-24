import React, { useState, useEffect } from 'react'
import { Table, Button, Space } from 'antd';
import { useHistory } from 'react-router-dom'
import { get, remove } from '../networking/Server'
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
    const history = useHistory();
    const authUser = useSelector(({ auth }) => auth.authUser);
    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const FetchUser = () => {
        setLoading(false)

        get("/api/user")
            .then((res) => {
                const a = res.filter((value) => value.email != localStorage.getItem("email"))
                console.log(authUser.email)
                setData(a)
            })
    }

    const DeleteUser = (id) => {
        remove(`/api/user/${id}`)
            .then((res) => {
                window.location.reload()
            })
    }

    const SignOut = () => {
        localStorage.removeItem("authUser")
        window.location.reload()
    }

    useEffect(() => {
        FetchUser()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => history.push(`../user/${record.id}`)}>Edit</a>
                    <a onClick={() => DeleteUser(record.id)}>Delete</a>
                </Space>
            ),
        },
    ];

    if (loading == true)
        return <div>loading...</div>
    return (
        <div className="container">
            <Button onClick={() => SignOut()}>Sign Out</Button>

            <h1>Users List</h1>
            <div className="table">
                <Table columns={columns} dataSource={data} size="middle" />
            </div>
        </div>
    )
}

export default Dashboard
