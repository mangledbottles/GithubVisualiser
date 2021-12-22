export interface Repositories {
    repositories: Repository[]
}

export interface Repository {
    id: number;
    name: string;
    html_url: string;
    description: string;
    language: string;
}