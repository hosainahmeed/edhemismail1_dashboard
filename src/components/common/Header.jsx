import React from 'react';
import { Avatar, Dropdown, Image, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/brand-black.png';
import { useGetProfileDataQuery } from '../../Redux/services/profileApis';

function Header() {
  const { data, isLoading } = useGetProfileDataQuery()
  if (isLoading) {
    return <div className='w-full h-16 animate-pulse bg-gray-200' ></div>;
  }
  const user = {
    fullName: data?.data?.fullName,
    email: data?.data?.email,
    img: data?.data?.profile_image
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  };


  const menu = (
    <Menu className="w-fit rounded-xl shadow-lg">
      <div className="p-4 flex items-center gap-3">
        <Image
          className="!w-12 !h-12 object-cover overflow-hidden rounded-full"
          src={user.img}
        />
        <div>
          <h1 className="font-semibold text-base">{user.fullName}</h1>
          <h1 className="font-normal opacity-75 text-sm">{user.email}</h1>
        </div>
      </div>
      <Menu.Divider />
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/dashboard/Settings/profile">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleSignOut}>
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="px-10 !z-[999] shadow-md mb-1 bg-white h-16 flex justify-between items-center">
      <div className="flex items-center gap-2  font-semibold">
        <img className="h-14" src={logo} alt="" />
      </div>
      <div className="flex items-center gap-4 text-2xl">
        <div className="flex items-center gap-3">
          <Dropdown overlay={menu} trigger={['click']} placement="bottom">
            <Avatar
              size={40}
              src={user.img}
              className="cursor-pointer"
            />
          </Dropdown>
          <div>
            <h1 className="text-sm font-normal text-black mb-0">{user?.fullName}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;