// hooks/useExploreData.ts
import { useState, useEffect } from "react";
import { Repository, Developer, Topic } from "@/types/explore";

export const useExploreData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for trending repositories
  const mockTrendingRepos: Repository[] = [
    {
      id: 1,
      name: "awesome-ai-tools",
      full_name: "microsoft/awesome-ai-tools",
      description:
        "A curated list of the best AI tools and frameworks for developers. From machine learning to natural language processing.",
      html_url: "https://github.com/microsoft/awesome-ai-tools",
      stargazers_count: 47300,
      language: "Python",
      owner: {
        login: "microsoft",
        avatar_url: "https://avatars.githubusercontent.com/u/6154722?s=200&v=4",
      },
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-06-01T14:22:00Z",
      topics: ["ai", "machine-learning", "tools"],
    },
    {
      id: 2,
      name: "react-native-super-ui",
      full_name: "facebook/react-native-super-ui",
      description:
        "Next-generation UI components for React Native with beautiful animations and modern design patterns.",
      html_url: "https://github.com/facebook/react-native-super-ui",
      stargazers_count: 32100,
      language: "TypeScript",
      owner: {
        login: "facebook",
        avatar_url: "https://avatars.githubusercontent.com/u/69631?s=200&v=4",
      },
      created_at: "2024-02-10T09:15:00Z",
      updated_at: "2024-06-03T11:45:00Z",
      topics: ["react-native", "ui", "components"],
    },
    {
      id: 3,
      name: "quantum-computing-simulator",
      full_name: "google/quantum-computing-simulator",
      description:
        "Open-source quantum computing simulator with advanced visualization and educational resources for quantum algorithms.",
      html_url: "https://github.com/google/quantum-computing-simulator",
      stargazers_count: 28900,
      language: "C++",
      owner: {
        login: "google",
        avatar_url: "https://avatars.githubusercontent.com/u/1342004?s=200&v=4",
      },
      created_at: "2024-01-20T16:45:00Z",
      updated_at: "2024-06-02T13:30:00Z",
      topics: ["quantum", "simulator", "physics"],
    },
    {
      id: 4,
      name: "rust-web-framework",
      full_name: "tokio-rs/rust-web-framework",
      description:
        "Lightning-fast web framework for Rust with built-in async support, WebAssembly compatibility, and modern tooling.",
      html_url: "https://github.com/tokio-rs/rust-web-framework",
      stargazers_count: 24500,
      language: "Rust",
      owner: {
        login: "tokio-rs",
        avatar_url:
          "https://avatars.githubusercontent.com/u/14369851?s=200&v=4",
      },
      created_at: "2024-03-05T12:20:00Z",
      updated_at: "2024-06-04T08:15:00Z",
      topics: ["rust", "web", "async"],
    },
    {
      id: 5,
      name: "blockchain-dev-toolkit",
      full_name: "ethereum/blockchain-dev-toolkit",
      description:
        "Complete toolkit for blockchain developers with smart contract templates, testing frameworks, and deployment tools.",
      html_url: "https://github.com/ethereum/blockchain-dev-toolkit",
      stargazers_count: 19700,
      language: "JavaScript",
      owner: {
        login: "ethereum",
        avatar_url: "https://avatars.githubusercontent.com/u/6250754?s=200&v=4",
      },
      created_at: "2024-02-28T14:10:00Z",
      updated_at: "2024-06-03T16:20:00Z",
      topics: ["blockchain", "ethereum", "web3"],
    },
  ];

  // Mock data for trending developers
  const mockTrendingDevs: Developer[] = [
    {
      id: 1,
      login: "sarah-ai-researcher",
      avatar_url: "https://i.pravatar.cc/150?img=1",
      html_url: "https://github.com/sarah-ai-researcher",
      type: "User",
      name: "Sarah Chen",
      company: "DeepMind",
      location: "London, UK",
      bio: "AI Researcher focusing on neural networks and machine learning. Building the future of artificial intelligence.",
      public_repos: 87,
      followers: 12400,
      following: 234,
    },
    {
      id: 2,
      login: "rustlang-core",
      avatar_url: "https://i.pravatar.cc/150?img=2",
      html_url: "https://github.com/rustlang-core",
      type: "Organization",
      name: "Rust Core Team",
      company: "Mozilla Foundation",
      location: "Worldwide",
      bio: "Core development team for the Rust programming language. Memory safety without garbage collection.",
      public_repos: 156,
      followers: 89300,
      following: 45,
    },
    {
      id: 3,
      login: "alex-blockchain-dev",
      avatar_url: "https://i.pravatar.cc/150?img=3",
      html_url: "https://github.com/alex-blockchain-dev",
      type: "User",
      name: "Alex Rodriguez",
      company: "Coinbase",
      location: "San Francisco, CA",
      bio: "Full-stack blockchain developer. Smart contracts, DeFi, and Web3 infrastructure specialist.",
      public_repos: 124,
      followers: 8700,
      following: 189,
    },
    {
      id: 4,
      login: "quantum-labs",
      avatar_url: "https://i.pravatar.cc/150?img=4",
      html_url: "https://github.com/quantum-labs",
      type: "Organization",
      name: "Quantum Labs",
      company: "IBM Research",
      location: "New York, USA",
      bio: "Advancing quantum computing research and making quantum algorithms accessible to developers worldwide.",
      public_repos: 203,
      followers: 34500,
      following: 78,
    },
    {
      id: 5,
      login: "maria-mobile-dev",
      avatar_url: "https://i.pravatar.cc/150?img=5",
      html_url: "https://github.com/maria-mobile-dev",
      type: "User",
      name: "Maria Santos",
      company: "Spotify",
      location: "Stockholm, Sweden",
      bio: "Senior Mobile Developer specializing in React Native and Flutter. Creating beautiful user experiences.",
      public_repos: 94,
      followers: 6800,
      following: 312,
    },
  ];

  // Mock data for trending topics
  const mockTrendingTopics: Topic[] = [
    {
      name: "artificial-intelligence",
      display_name: "Artificial Intelligence",
      short_description:
        "Machine learning, neural networks, and AI research projects that are shaping the future of technology.",
      featured: true,
      curated: true,
      score: 98.5,
    },
    {
      name: "react-native",
      display_name: "React Native",
      short_description:
        "Cross-platform mobile development framework for building native apps with React and JavaScript.",
      featured: true,
      curated: true,
      score: 95.2,
    },
    {
      name: "blockchain",
      display_name: "Blockchain",
      short_description:
        "Decentralized technologies, cryptocurrencies, smart contracts, and Web3 development frameworks.",
      featured: false,
      curated: true,
      score: 92.1,
    },
    {
      name: "rust",
      display_name: "Rust",
      short_description:
        "Systems programming language focused on safety, speed, and concurrency without garbage collection.",
      featured: false,
      curated: true,
      score: 89.7,
    },
    {
      name: "machine-learning",
      display_name: "Machine Learning",
      short_description:
        "Data science, predictive modeling, and statistical learning algorithms for intelligent applications.",
      featured: true,
      curated: true,
      score: 94.3,
    },
    {
      name: "docker",
      display_name: "Docker",
      short_description:
        "Containerization platform for developing, shipping, and running applications in isolated environments.",
      featured: false,
      curated: true,
      score: 87.9,
    },
    {
      name: "quantum-computing",
      display_name: "Quantum Computing",
      short_description:
        "Next-generation computing using quantum mechanical phenomena for exponentially faster processing.",
      featured: false,
      curated: false,
      score: 85.4,
    },
    {
      name: "typescript",
      display_name: "TypeScript",
      short_description:
        "Strongly typed programming language that builds on JavaScript with static type definitions.",
      featured: false,
      curated: true,
      score: 91.6,
    },
  ];

  const refetch = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate occasional error for demonstration
      if (Math.random() < 0.1) {
        throw new Error("Network error: Unable to fetch trending data");
      }

      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    mockTrendingRepos,
    mockTrendingDevs,
    mockTrendingTopics,
    loading,
    error,
    refetch,
  };
};
