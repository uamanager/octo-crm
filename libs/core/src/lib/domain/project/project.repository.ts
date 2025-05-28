import { ProjectModel } from './model';

export abstract class ProjectRepository {
  abstract searchProjects(
    user: string,
    limit: number,
    offset: number,
  ): Promise<[ProjectModel[], number]>;

  abstract getProjectById(user: string, id: string): Promise<ProjectModel | null>;

  abstract getProjectByKey(user: string, key: string): Promise<ProjectModel | null>;

  abstract createProject(user: string, key: string, source: string): Promise<ProjectModel>;

  abstract deleteProject(user: string, id: string): Promise<void>;
}
