import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Button, Pagination, Table, Tag } from 'antd';
import { useState } from "react";
import { userApi } from '../../../apis/user.api';
import { PAGE_SIZE, USER_TYPES_MAPPING } from '../../../constants';
import { UserItem } from '../../../interfaces/user.interface';

const UserManagement = () => {
  const [currentPage , setCurrentPage] = useState(1);
  const [pageSize , setPageSize] = useState(PAGE_SIZE);

  const { data, isLoading, error } = useQuery({
    queryKey: ['list-users', { currentPage, pageSize }],
    queryFn: () => userApi.getListUser({ page: currentPage , pageSize }),
  });

  const columns = [
    {
      title: 'Username',
      key: 'user-name',
      dataIndex: 'taiKhoan',
    },
    {
      title: 'Full name',
      key: 'full-name',
      dataIndex: 'hoTen',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Phone number',
      key: 'phone-number',
      dataIndex: 'soDt',
    },
    {
      title: 'Type User',
      key: 'type-user',
      dataIndex: 'maLoaiNguoiDung',
      render: (_: any, { maLoaiNguoiDung }: { maLoaiNguoiDung: string }) => (
        <Tag>{USER_TYPES_MAPPING[maLoaiNguoiDung] || ''}</Tag>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (record: UserItem) => {
        return (
          <div className="flex">
            <Button type="primary" className="mr-2" onClick={() => alert(record.taiKhoan)}>
              Edit
            </Button>
            <Button type="primary" danger onClick={() => alert(record.taiKhoan)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const dataSource = data?.items || [];
  const total = data?.totalCount || 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Dashboard',
            },
            {
              title: 'User Management',
              href: '',
            },
          ]}
        />

        <Button size="large" type="primary">
          Add User
        </Button>
      </div>
      <h3 className="font-medium text-2xl mb-3">List Users</h3>
      <Table rowKey="taiKhoan" columns={columns} dataSource={dataSource} pagination={false} loading={isLoading} />
      <div className="flex justify-end mt-10">
        <Pagination
          total={total}
          defaultCurrent={currentPage}
          onChange={(page: number , pSize: number) => {
            setCurrentPage(page);

            if (pSize !== pageSize){
              setPageSize(pSize)
            }
          }}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default UserManagement;
