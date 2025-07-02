// hooks/useRepositories.ts - Custom hook for repository management (Optional)
import { useState, useEffect } from 'react';
import { Repository } from '../types/repository';

interface UseRepositoriesReturn {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  refreshRepositories: () => Promise<void>;
  searchRepositories: (query: string) => Repository[];
}

export const useRepositories = (username: string = 'microsoft'): UseRepositoriesReturn => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const transformedRepos: Repository[] = data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || '',
        private: repo.private,
        owner: {
          login: repo.owner.login,
          avatar_url: repo.owner.avatar_url,
        },
        html_url: repo.html_url,
        clone_url: repo.clone_url,
        ssh_url: repo.ssh_url,
        language: repo.language || 'Unknown',
        stargazers_count: repo.stargazers_count,
        watchers_count: repo.watchers_count,
        forks_count: repo.forks_count,
        open_issues_count: repo.open_issues_count,
        default_branch: repo.default_branch,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
        size: repo.size,
        topics: repo.topics || [],
        license: repo.license ? {
          name: repo.license.name,
          spdx_id: repo.license.spdx_id,
        } : undefined,
      }));

      setRepositories(transformedRepos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refreshRepositories = async () => {
    await fetchRepositories();
  };

  const searchRepositories = (query: string): Repository[] => {
    if (query.trim() === '') return repositories;
    
    return repositories.filter(repo =>
      repo.name.toLowerCase().includes(query.toLowerCase()) ||
      repo.description.toLowerCase().includes(query.toLowerCase()) ||
      (repo.language && repo.language.toLowerCase().includes(query.toLowerCase())) ||
      repo.topics.some(topic => topic.toLowerCase().includes(query.toLowerCase()))
    );
  };

  useEffect(() => {
    fetchRepositories();
  }, [username]);

  return {
    repositories,
    loading,
    error,
    refreshRepositories,
    searchRepositories,
  };
};