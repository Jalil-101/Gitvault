// hooks/useReadme.ts
import { useState, useEffect } from 'react';
import { ReadmeData } from '../types/readme';
import { readmeService } from '../services/readmeService';

export const useReadme = (repoFullName: string) => {
  const [readme, setReadme] = useState<ReadmeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchReadme = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const readmeData = await readmeService.fetchReadme(repoFullName);
        
        if (isMounted) {
          setReadme(readmeData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch README');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReadme();

    return () => {
      isMounted = false;
    };
  }, [repoFullName]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    readmeService.fetchReadme(repoFullName).then(setReadme).catch(setError);
  };

  return { readme, loading, error, refetch };
};