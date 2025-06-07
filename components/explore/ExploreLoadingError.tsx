import React from "react";
import { View } from "react-native";
import { LoadingSpinner } from "@/components/explore/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";

interface ExploreLoadingErrorProps {
  loading: boolean;
  error: any;
  refreshing: boolean;
  onRetry: () => void;
}

export const ExploreLoadingError: React.FC<ExploreLoadingErrorProps> = ({
  loading,
  error,
  refreshing,
  onRetry,
}) => {
  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center py-20">
        <LoadingSpinner />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center py-20">
        <ErrorState error={error} onRetry={onRetry} />
      </View>
    );
  }

  return null;
};
