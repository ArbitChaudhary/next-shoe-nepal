"use client";
import LoadingButton from "@/components/ui/buttons/loading-button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  itemName?: string;
  title?: string;
  isLoading?: boolean;
}

const DeleteModal = ({
  open,
  onClose,
  onDelete,
  itemName,
  title = "Delete Product?",
  isLoading = false,
}: DeleteModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[250px] md:w-[400px]">
        <div className="flex justify-center items-center flex-col">
          <div className="text-base md:text-xl font-bold">{title}</div>
          <span className="text-muted-foreground text-xs block">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{itemName}</span>?
          </span>
          <span className="text-muted-foreground text-xs">
            This action cannot be undone.
          </span>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2 md:gap-4">
          <LoadingButton type="button" onClick={onClose} title="Cancel" />
          <LoadingButton
            type="button"
            onClick={onDelete}
            title="Confirm"
            disabled={isLoading}
            isLoading={isLoading}
            className="bg-destructive"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
