import { useQuery } from '@tanstack/react-query'
import { Breadcrumb, Button, Pagination, Table, Tag, Typography } from 'antd'
import { movieApi } from '../../../apis/movie.api'
import { Rate } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { MovieItem } from '../../../interfaces/movie.interface'
import { useState } from 'react'
import { PAGE_SIZE } from '../../../constants'

const MovieManagement = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const { data, isLoading, error } = useQuery({
    queryKey: ['movie', { currentPage, pageSize }],
    queryFn: () => movieApi.getListMovie({ page: currentPage, pageSize }),
  })

  const dataSource = data?.items || []
  const total = data?.totalCount || 0

  const columns: ColumnsType<MovieItem> = [
    {
      title: 'Tên Phim',
      key: 'ten-phim',
      dataIndex: 'tenPhim',
      render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: 'Trailer',
      key: 'trailer',
      dataIndex: 'trailer',
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          Xem trailer
        </a>
      ),
    },
    {
      title: 'Hình Ảnh',
      key: 'hinh-anh',
      dataIndex: 'hinhAnh',
      render: (text: string) => <img src={text} alt="Hình ảnh phim" style={{ width: '100px' }} />,
    },
    {
      title: 'Mô tả',
      key: 'mo-ta',
      dataIndex: 'moTa',
      ellipsis: true,
    },
    {
      title: 'Ngày khởi chiếu',
      key: 'ngay-khoi-chieu',
      dataIndex: 'ngayKhoiChieu',
      render: (text: string) => new Date(text).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Đánh giá',
      key: 'danh-gia',
      dataIndex: 'danhGia',
      render: (value: number) => <Rate disabled defaultValue={value} />,
    },
    {
      title: 'Hot',
      key: 'hot',
      dataIndex: 'hot',
      render: (_: any, { hot }: { hot: boolean }) => <Tag color={hot ? 'red' : 'green'}>{hot ? 'Hot' : 'Down'}</Tag>,
    },
    {
      title: 'Đang Chiếu',
      key: 'dang-chieu',
      dataIndex: 'dangChieu',
      render: (_: any, { dangChieu }: { dangChieu: boolean }) => <Tag color={dangChieu ? 'green' : 'red'}>{dangChieu ? 'Đang Chiếu' : 'Không Chiếu'}</Tag>,
    },
    {
      title: 'Sắp Chiếu',
      key: 'sap-chieu',
      dataIndex: 'sapChieu',
      render: (text: boolean) => <Tag color={text ? 'blue' : 'orange'}>{text ? 'Có' : 'Không'}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: MovieItem) => {
        return (
          <div className="flex">
            <Button
              type="primary"
              className="mr-2"
              onClick={() => {
                alert(record.maPhim)
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                alert(record.maPhim)
              }}
            >
              Delete
            </Button>
          </div>
        )
      },
    },
  ]
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
              title: 'Movie Management',
              href: '',
            },
          ]}
        />

        <Button size="large" type="primary">
          Add Movie
        </Button>
      </div>
      <h3 className="font-medium text-2xl mb-3">List Movies</h3>

      <Table rowKey="maPhim" columns={columns} dataSource={dataSource} pagination={false} loading={isLoading} />
      <div className="flex justify-end mt-10">
        <Pagination
          total={total}
          current={currentPage}
          pageSize={pageSize}
          onChange={(page: number, pSize?: number) => {
            setCurrentPage(page)
            if (pSize !== undefined && pSize !== pageSize) {
              setPageSize(pSize)
            }
          }}
        />
      </div>
    </div>
  )
}

export default MovieManagement
