import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { useLoading } from "./loading-context";

export const LoadingDemo: React.FC = () => {
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();

  const handleButtonClick = () => {
    showLoading("Processing request...");
    // Simulate async operation
    setTimeout(() => {
      hideLoading();
    }, 2000);
  };

  const handleNavigate = (path: string) => {
    showLoading("Loading page...");
    router.push(path);
    // Note: In actual usage, the component will re-render after navigation,
    // so there's no need to explicitly call hideLoading here
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleButtonClick}>
        Show Loading
      </Button>
      
      <Button onClick={() => handleNavigate("/some-path")}>
        Go to another page
      </Button>
    </div>
  );
};