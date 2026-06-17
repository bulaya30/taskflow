import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Task } from "@/interfaces/task";
import { exportTasksPdf } from "@/lib/exportTasksPdf";

type Props = {
  tasks: Task[];
};

export default function ExportPdfButton({
  tasks,
}: Props) {
  const handleExport = () => {
    exportTasksPdf(tasks);
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleExport}
      className="
        w-full
        sm:w-auto
        flex
        px-4
        py-4
        items-center
        gap-2
        cursor-pointer
        bg-white/10
        border-white/10
        hover:bg-white/20
      "
    >
      <FileDown className="w-4 h-4" />

      <span>Export PDF</span>
    </Button>
  );
}