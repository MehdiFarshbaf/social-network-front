import { Modal } from "@mantine/core";
import { CallbackFunction } from "@/interfaces/publlicInterfaces";
import { Loader } from '@mantine/core';
interface IProps {
  opened: boolean;
  handleClose: CallbackFunction;
  handleConfirm: CallbackFunction;
  title: string;
  question: string;
  isLoading?: boolean;
}
const ConfirmModal = ({
  handleConfirm,
  handleClose,
  question,
  opened,
  title,
  isLoading,
}: IProps) => {
  return (
    <Modal opened={opened} onClose={handleClose} title={title} centered>
      <form className="w-full" onSubmit={handleConfirm}>
        <h2 className="text-center">{question}</h2>
        <div className="w-full flex justify-between items-center">
          <button
            type="button" onClick={handleClose} disabled={isLoading}
            className="btn bg-blue-500 text-white mt-4 text-base font-medium "
          >انصراف</button>
          <button
            type="submit" disabled={isLoading}
            className="btn bg-blue-500 text-white mt-4 text-base font-medium "
          >{isLoading ? <Loader color="white" size={20} /> : "تایید"}</button>
        </div>
      </form>
    </Modal>
  );
};
export default ConfirmModal;
