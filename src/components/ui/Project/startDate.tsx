import { DateInput } from "@mantine/dates";


  
type StartDateSelectorByTaskProps = {
    startDate: Date | null;
    onChange: (date: Date | null) => void;
};

export const StartDateGenericSelector = ({ startDate, onChange }: StartDateSelectorByTaskProps) => {
    return (
        <DateInput
              size="xs"
              placeholder="Set due date"
              value={startDate}
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
