import {
  IProjectCreateRequestDtoBody,
  IProjectCreateResponseDto,
  IProjectDeleteRequestDtoParams,
  IProjectDeleteResponseDto,
  IProjectRefreshRequestDtoParams,
  IProjectRefreshResponseDto,
  IProjectSearchRequestDtoQuery,
  IProjectSearchResponseDto,
} from '@octo-crm/shared';
import { AxiosClient } from '../common/axios/use-axios';

export const useProjectApi = () => {
  const createProject = async (body: IProjectCreateRequestDtoBody) => {
    return AxiosClient.post<IProjectCreateResponseDto>('/v1/project', body).then(
      (res) => res.data,
    );
  };

  const deleteProject = async (params: IProjectDeleteRequestDtoParams) => {
    return AxiosClient.delete<IProjectDeleteResponseDto>(`/v1/project/${params.id}`).then(
      (res) => res.data,
    );
  };

  const refreshProject = async (params: IProjectRefreshRequestDtoParams) => {
    return AxiosClient.post<IProjectRefreshResponseDto>(
      `/v1/project/refresh/${params.id}`,
    ).then((res) => res.data);
  };

  const searchProjects = async (query: IProjectSearchRequestDtoQuery) => {
    return AxiosClient.get<IProjectSearchResponseDto>('/v1/project', {
      params: query,
    }).then((res) => res.data);
  };

  return {
    createProject,
    deleteProject,
    refreshProject,
    searchProjects,
  };
};
