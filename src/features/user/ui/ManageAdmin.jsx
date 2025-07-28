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
// import {
//   useDeleteUserMutation,
//   useGetAllUserQuery,
//   useUpdateUserStatusMutation,
// } from '../../../Redux/services/dashboard apis/userApis';
// import { imageUrl } from '../../../utils/server';
import { debounce } from 'lodash';

const ManageAdmin = () => {
    const [createNewAdminModal, setCreateNewAdminModal] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState();
    const [updateAdminInfo, setUpdateAdminInfo] = useState(false);
    const [selectAdmin, setSelectAdmin] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetailsModal, setUserDetailsModal] = useState(false);
    const [page, setPage] = useState(1);

    // Dummy data instead of API call
    const adminsLoading = false;
    const adminsData = {
        data: [
            {
                _id: '1',
                fullName: 'John Doe',
                contactNo: '1234567890',
                email: 'john@example.com',
                approvalStatus: 'approved',
                otpVerified: true,
                preferedContactMethod: 'email',
                address: '123 Main St',
                proffession: 'Developer',
                eldestRelative: 'Father',
                familySide: 'Paternal',
                subscription: 'Premium',
                paymentStatus: 'paid',
                img: 'avatar1.jpg',
                role: 'admin',
                status: 'active',
                isDeleted: false,
            },
            {
                _id: '2',
                fullName: 'Jane Smith',
                contactNo: '9876543210',
                email: 'jane@example.com',
                approvalStatus: 'approved',
                otpVerified: true,
                preferedContactMethod: 'phone',
                address: '456 Oak Ave',
                proffession: 'Designer',
                eldestRelative: 'Mother',
                familySide: 'Maternal',
                subscription: 'Basic',
                paymentStatus: 'paid',
                img: 'avatar2.jpg',
                role: 'admin',
                status: 'active',
                isDeleted: false,
            },
        ],
        meta: {
            limit: 10,
            total: 2,
        }
    };

    // Commented out API hooks
    // const { data: adminsData, isLoading: adminsLoading } = useGetAllUserQuery({
    //   role: 'admin',
    //   searchTerm: searchedUsers,
    //   page,
    //   limit: 10,
    // });

    // const [updateUserStatus] = useUpdateUserStatusMutation();
    // const [deleteUser] = useDeleteUserMutation();

    const adminsInfo =
        adminsData?.data?.map((item) => {
            return {
                key: item?._id,
                name: item?.fullName,
                contactNumber: item?.contactNo,
                email: item?.email,
                approvalStatus: item?.approvalStatus,
                otpVerified: item?.otpVerified,
                preferedContactMethod: item?.preferedContactMethod,
                address: item?.address,
                proffession: item?.proffession,
                eldestRelative: item?.eldestRelative,
                familySide: item?.familySide,
                subscription: item?.subscription,
                paymentStatus: item?.paymentStatus,
                img: item?.img,
                role: item?.role,
                status: item?.status,
                isDeleted: item?.isDeleted,
            };
        }) || [];

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
                        src={record.img} // Removed imageUrl function
                    />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
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
                        size="small"
                    />
                    <Button
                        onClick={() => {
                            setSelectAdmin(record);
                            setUpdateAdminInfo(true);
                        }}
                        className="!bg-[var(--primary-color)]"
                        type="default"
                        icon={<EditOutlined className="!text-white" />}
                        size="small"
                    />
                    <Popconfirm
                        title="Are you sure to delete this admin?"
                        onConfirm={() => deleteHandler(record.key)}
                    >
                        <Button
                            danger
                            type="default"
                            icon={<DeleteOutlined />}
                            size="small"
                        />
                    </Popconfirm>

                    <Popconfirm
                        title={`Are you sure to ${record?.status === 'active' ? 'block' : 'unblock'
                            } this admin?`}
                        onConfirm={() => blockUser(record)}
                    >
                        <Button
                            className={`${record?.status === 'active' ? '!bg-green-200' : '!bg-red-300'
                                } ant-btn ant-btn-default`}
                            type="default"
                            icon={<FaRegCircle />}
                            size="small"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const deleteHandler = (id) => {
        // Commented out actual API call
        // try {
        //   deleteUser({ id })
        //     .unwrap()
        //     .then((res) => {
        //       if (res?.success) {
        //         toast.success(res?.message || 'User deleted successfully!');
        //       }
        //     });
        // } catch (error) {
        //   toast.error(error?.data?.message || 'Something went wrong');
        // }

        // Dummy implementation
        toast.success('Admin deleted successfully! (demo)');
        console.log('Would delete admin with id:', id);
    };

    const blockUser = async (record) => {
        // Commented out actual API call
        // const id = record?.key;
        // const data = {
        //   status: record?.status === 'active' ? 'blocked' : 'active',
        // };
        // try {
        //   await updateUserStatus({ id, data })
        //     .unwrap()
        //     .then((res) => {
        //       if (res?.success) {
        //         toast.success(res?.message || 'User status updated successfully!');
        //       }
        //     });
        // } catch (error) {
        //   toast.error(error?.data?.message || 'Something went wrong');
        // }

        // Dummy implementation
        const newStatus = record?.status === 'active' ? 'blocked' : 'active';
        toast.success(`Admin status changed to ${newStatus} (demo)`);
        console.log('Would update status for:', record.key, 'to:', newStatus);
    };

    const handleSearch = debounce((value) => {
        setSearchedUsers(value);
        console.log('Searching for:', value);
    }, 300);

    return (
        <div>
            <div className="flex !items-start justify-between">
                <div className="max-w-[400px] min-w-[400px]">
                    <Form className="!w-full !h-fit">
                        <Form.Item>
                            <Input
                                loading={adminsLoading}
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
                    pageSize: adminsData?.meta?.limit,
                    total: adminsData?.meta?.total,
                    onChange: (page) => setPage(page),
                    showSizeChanger: false,
                }}
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
                        <p className="font-semibold mt-2">Phone Number</p>
                        <p className="p-2 border border-[#64748B] rounded-md">
                            {selectedUser?.contactNumber}
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ManageAdmin;