import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { getAllUsers, resetUserStatus, updateUserStatus } from "../../redux/slice/user/userSlice";

const Users = () => {
  
  const { all_users, isSuccess } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const onStatusUpdate = (id, status) => {
    const payload = {
        id: id,
        status: status
    }

    dispatch(updateUserStatus(payload))
  }

  const columns =[
    { 
        title: "Name",
        dataIndex: "name",
    },
    { 
        title: "Email",
        dataIndex: "email",
    },
    { 
        title: "Role",
        dataIndex: "role",
        render: (text, record) => {
            return <p className="uppercase">{record.role}</p>
        }
    },
    { 
        title: "Added On",
        dataIndex: "createdAt",
        render: (text, record) => {
           return moment(record.createdAt).format("DD/MM/YYYY hh:mm a"); 
        }
    },
    { 
        title: "Status",
        dataIndex: "status",
        render: (text, record) => {
            return <p className="uppercase">{record.status}</p>
        }
    },
    { 
        title: "Action",
        dataIndex: "action",
        render : (text, record) => {
            const {status, _id} = record
            return <div className="flex gap-3">
                {status === "active" && (
                    <span 
                        className="underline cursor-pointer text-red-500 "
                        onClick={() => onStatusUpdate(_id, "blocked")}
                    >
                        Block
                    </span>
                )}
                {status === "blocked" && (
                    <span 
                        className="underline cursor-pointer text-green-700"
                        onClick={() => onStatusUpdate(_id, "active")}
                    >
                        Unblock
                    </span>
                )}
            </div>
        }
    },
  ]

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(resetUserStatus())
  }, [dispatch, isSuccess]);

  
  return (
    <div>
        <Table columns={columns} dataSource={all_users?.map(user => ({ ...user, key: user._id }))} className='overflow-x-scroll no-scrollbar mt-2' />
    </div>
  );
};

export default Users;
