import React, { useState } from 'react';
import {
    Table,
    Tag,
    Space,
    Avatar,
    Button,
    Modal,
    Form,
    Input,
    Popconfirm,
    Spin,
} from 'antd';
import {
    UserOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { FaRegCircle } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import CreateNewAdmin from './CreateNewAdmin.jsx';
import UpdateAdminInformatio from './UpdateAdminInformatio';
import { debounce } from 'lodash';
import { useGetAdminsQuery, useDeleteAdminMutation } from '../../../Redux/Apis/service/adminApis.js';

const ManageAdmin = () => {
    const [createNewAdminModal, setCreateNewAdminModal] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState('');
    const [updateAdminInfo, setUpdateAdminInfo] = useState(false);
    const [selectAdmin, setSelectAdmin] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetailsModal, setUserDetailsModal] = useState(false);
    const [page, setPage] = useState(1);
    const [id, setId] = useState(null);

    // Commented out API hooks
    const { data: adminsData, isLoading: adminsLoading, error } = useGetAdminsQuery({
        searchTerm: searchedUsers,
        page,
        limit: 10,
    });

    if (error) console.error('Error fetching admins:', error);
    const [deleteUser, { isLoading: deleteLoading }] = useDeleteAdminMutation();

    const adminsInfo =
        adminsData?.data?.result?.map((item) => ({
            id: item?._id,
            user: {
                _id: item?.user?._id,
                isBlocked: item?.user?.isBlocked,
                isActive: item?.user?.isActive
            },
            name: item?.name,
            email: item?.email,
            profile_image: item?.profile_image,
            isDeleted: item?.isDeleted,
            phone: item?.phone,
            createdAt: item?.createdAt,
            updatedAt: item?.updatedAt
        })) || [];

    const columns = [
        {
            title: 'Admin Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="flex items-center">
                    <Avatar
                        size="small"
                        style={{ marginRight: 8 }}
                        src={record?.profile_image}
                    />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        onClick={() => {
                            setUserDetailsModal(true);
                            setSelectedUser(record);
                        }}
                        className="!bg-[var(--primary-color)]"
                        type="default"
                        icon={<UserOutlined className="!text-white" />}
                        size="middle"
                    />
                    <Button
                        onClick={() => {
                            setSelectAdmin(record);
                            setUpdateAdminInfo(true);
                        }}
                        className="!bg-[var(--primary-color)]"
                        type="default"
                        icon={<EditOutlined className="!text-white" />}
                        size="middle"
                    />
                    <Popconfirm
                        title="Are you sure to delete this admin?"
                        onConfirm={() => {
                            setId(record?.id)
                            deleteHandler(record?.id)
                        }}
                    >
                        <Button
                            danger
                            type="default"
                            loading={deleteLoading && record?.id === id}
                            icon={<DeleteOutlined />}
                            size="middle"
                        />
                    </Popconfirm>

                    <Popconfirm
                        title={`Are you sure to ${record?.user?.isBlocked ? 'unblock' : 'block'
                            } this admin?`}
                        onConfirm={() => blockUser(record?.user?.id)}
                    >
                        <Button
                            className={`${record?.user?.isBlocked ? '!bg-red-200' : '!bg-green-300'
                                } ant-btn ant-btn-default`}
                            type="default"
                            icon={<FaRegCircle />}
                            size="middle"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const deleteHandler = (id) => {
        // Commented out actual API call
        try {
            deleteUser({ id })
                .unwrap()
                .then((res) => {
                    if (res?.success) {
                        toast.success(res?.message || 'User deleted successfully!');
                    }
                });
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    const blockUser = async (id) => {
        console.log(id)
        // const data = {
        //     status: record?.user?.isBlocked ? 'unblocked' : 'blocked',
        // };
        // try {
        //     await updateUserStatus({ id, data })
        //         .unwrap()
        //         .then((res) => {
        //             if (res?.success) {
        //                 toast.success(res?.message || 'User status updated successfully!');
        //             }
        //         });
        // } catch (error) {
        //     toast.error(error?.data?.message || 'Something went wrong');
        // }

    };

    const handleSearch = debounce((value) => {
        setSearchedUsers(value);
    }, 300);

    console.log(adminsData)

    return (
        <div>
            <div className="flex !items-start justify-between">
                <div className="max-w-[400px] min-w-[400px]">
                    <Form className="!w-full !h-fit">
                        <Form.Item>
                            <Input
                                placeholder="Search by name"
                                onChange={(e) => handleSearch(e.target.value)}
                                allowClear
                            />
                        </Form.Item>
                    </Form>
                </div>
                <Button
                    onClick={() => setCreateNewAdminModal(true)}
                    icon={<PlusOutlined />}
                    className="!bg-[var(--primary-color)] !text-white"
                >
                    Add New Admin
                </Button>
            </div>
            <Table
                bordered
                columns={columns}
                dataSource={adminsInfo}
                loading={adminsLoading}
                pagination={{
                    position: ['bottomCenter'],
                    pageSize: adminsData?.data?.meta?.limit,
                    total: adminsData?.data?.meta?.total,
                    onChange: (page) => setPage(page),
                    showSizeChanger: false,
                }}
                size="large"
                scroll={{ x: 1000 }}
            />

            <Modal open={createNewAdminModal} footer={null} closeIcon={false}>
                <CreateNewAdmin closeModal={setCreateNewAdminModal} />
            </Modal>
            <Modal centered open={updateAdminInfo} footer={null} closeIcon={false}>
                <UpdateAdminInformatio
                    adminData={selectAdmin}
                    closeModal={setUpdateAdminInfo}
                />
            </Modal>
            <Modal
                visible={userDetailsModal}
                onCancel={() => setUserDetailsModal(false)}
                footer={null}
                className="user-details-modal"
            >
                <div className="flex flex-col items-center">
                    <Avatar className="!w-24 !h-24" src={selectedUser?.img} />
                    <h1 className="text-2xl font-bold">{selectedUser?.name}</h1>
                    <div className="!w-full p-1 border-1 border-[var(--vg-green-high)] rounded-md">
                        <div className="p-2 bg-[var(--primary-color)] !text-white flex items-center justify-center font-semibold text-base rounded-md">
                            Admin Profile
                        </div>
                    </div>
                    <div className="mt-4 !w-full">
                        <p className="font-semibold">Admin Full Name</p>
                        <p className="p-2 border border-[#64748B] rounded-md">
                            {selectedUser?.name}
                        </p>
                        <p className="font-semibold mt-2">Email</p>
                        <p className="p-2 border border-[#64748B] rounded-md">
                            {selectedUser?.email}
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ManageAdmin;