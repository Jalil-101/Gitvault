// hooks/useRepositorySearch.ts
import { useState, useMemo } from "react";
import { Repository } from "@/types/starRepository";

export const useRepositorySearch = (repositories: Repository[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepositories = useMemo(() => {
    if (searchQuery === "") {
      return repositories;
    }

    return repositories.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [repositories, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredRepositories,
  };
};
