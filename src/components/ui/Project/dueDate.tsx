import { DateInput } from "@mantine/dates";


  
type DueDateSelectorByTaskProps = {
    dueDate: Date | null;
    onChange: (date: Date | null) => void;
};

export const DueDateGenericSelector = ({ dueDate, onChange }: DueDateSelectorByTaskProps) => {
    return (
        <DateInput
              size="xs"
              placeholder="Set due date"
              value={dueDate}
              onChange={onChange}
              clearable
              styles={{
                input: {
                  padding: "0px 8px",
                  borderRadius: 4,
                  backgroundColor: "transparent",
                },
              }}
            />
    );
            };
