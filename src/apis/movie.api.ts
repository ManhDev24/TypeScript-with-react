import { GROUP_CODE, PAGE_SIZE } from '../constants';
import fetcher from './fetcher';

export const movieApi = {
  getListMovie: async (payload: { page: number; pageSize?: number }) => {
    try {
      const { page, pageSize = PAGE_SIZE } = payload;
      const params = {
        maNhom: GROUP_CODE,
        soTrang: page,
        soPhanTuTrenTrang: pageSize,
      };

      const response = await fetcher.get(`QuanLyPhim/LayDanhSachPhimPhanTrang`, { params });
      return response.data.content;
    } catch (error :any) {
      throw new Error(error.response?.data?.content || 'Error fetching movies');
    }
  },
};
