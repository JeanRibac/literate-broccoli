import { useRouter } from "next/router";

import { trpc } from "@/utils/trpc";

const Content: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(["questions.get-by-id", { id }]);
  if (!isLoading && !data) {
    return <div>Question not found!</div>;
  }
  return (
    <div>
      <div>Question: {data?.question}</div>
      <div className="flex flex-col justify-start gap-2">
        {(data?.options as string[])?.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </div>
    </div>
  );
};

export default function QuestionPage() {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>No ID</div>;
  }
  return <Content id={id} />;
}
