// components/home/FeedItem.tsx
import React from "react";
import {
  FeedItem as FeedItemType,
  isRepository,
  isIssue,
  isPullRequest,
} from "@/types";
import { RepositoryCard } from "./RepositoryCard";
import { IssueCard } from "./IssueCard";
import { PullRequestCard } from "./PullRequestCard";

interface FeedItemProps {
  item: FeedItemType;
  index: number;
}

export const FeedItem: React.FC<FeedItemProps> = ({ item, index }) => {
  switch (item.type) {
    case "repository":
      if (isRepository(item.data)) {
        return (
          <RepositoryCard
            key={`${item.type}-${item.id}-${index}`}
            repository={item.data}
          />
        );
      }
      break;
    case "issue":
      if (isIssue(item.data)) {
        return (
          <IssueCard
            key={`${item.type}-${item.id}-${index}`}
            issue={item.data}
          />
        );
      }
      break;
    case "pull_request":
      if (isPullRequest(item.data)) {
        return (
          <PullRequestCard
            key={`${item.type}-${item.id}-${index}`}
            pullRequest={item.data}
          />
        );
      }
      break;
    default:
      return null;
  }

  return null;
};
