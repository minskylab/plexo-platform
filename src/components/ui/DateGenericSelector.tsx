import { DateInput } from "@mantine/dates";

type DateSelectorProps = {
  placeholder: string;
  date: Date | null;
  onChange: (date: Date | null) => void;
};

export const DateGenericSelector = ({ placeholder, date, onChange }: DateSelectorProps) => {
  return (
    <DateInput
      size="xs"
      placeholder={placeholder}
      value={date}
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
