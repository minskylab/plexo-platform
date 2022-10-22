import { Kbd, Menu, MenuItemProps, TextInput } from "@mantine/core";
import React from "react";

// type GenericStatusMenuProps = {
//     children: React.ReactNode;
//     onSelect?: (priority: TaskStatus | undefined) => void;
//   };

//   export const GenericStatusMenu = ({ children, onSelect }: GenericStatusMenuProps) => {
//     const theme = useMantineTheme();

//     return (

//     );
//   };

//   type StatusSelectorProps = {
//     initialStatus?: TaskStatus;
//   };

//   export const StatusSelector = ({ initialStatus }: StatusSelectorProps) => {
//     const [status, setStatus] = useState<TaskStatus | undefined>(initialStatus);
//     const theme = useMantineTheme();

//     return (
//       <GenericStatusMenu onSelect={priority => setStatus(priority)}>
//         <Button compact variant="light" color={"gray"} leftIcon={StatusIcon(theme, status, 18)}>
//           <Text size={"xs"}>{statusName(status)}</Text>
//         </Button>
//       </GenericStatusMenu>
//     );
//   };

type UniqueElement = {
  id: string;
};

type MenuWithSelectProps<T extends UniqueElement> = {
  elements: T[];
  elementComponent: (id: string, element: T) => JSX.Element;
  children: React.ReactNode;
  searchPlaceholder?: string;
  searchShortcut?: string;
};

export const MenuWithTextInput = <T extends UniqueElement>({
  //   id,
  children,
  elements,
  elementComponent,
  searchPlaceholder,
  searchShortcut,
}: MenuWithSelectProps<T>) => {
  return (
    <Menu shadow="md" width={180}>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <TextInput
          placeholder={searchPlaceholder || "Search..."}
          variant="filled"
          rightSection={<Kbd px={8}>{searchShortcut}</Kbd>}
        />
        <Menu.Divider />
        {elements.map(element => elementComponent(element.id, element))}
        {/* <Menu.Item
          icon={<CircleDashed size={18} color={theme.colors.gray[6]} />}
          onClick={() => onSelect && onSelect("backlog")}
        >
          Backlog
        </Menu.Item>
        <Menu.Item icon={<Circle size={18} />} onClick={() => onSelect && onSelect("todo")}>
          Todo
        </Menu.Item>
        <Menu.Item
          icon={<CircleHalf size={18} color={theme.colors.yellow[6]} />}
          onClick={() => onSelect && onSelect("in-progress")}
        >
          In Progress
        </Menu.Item>
        <Menu.Item
          icon={
            <DotsCircleHorizontal
              size={18}
              color={theme.colors.green[6]}
              onClick={() => onSelect && onSelect("in-review")}
            />
          }
        >
          In Review
        </Menu.Item>
        <Menu.Item
          icon={<CircleCheck size={18} color={theme.colors.indigo[6]} />}
          onClick={() => onSelect && onSelect("done")}
        >
          Done
        </Menu.Item>
        <Menu.Item
          icon={<CircleX size={18} color={theme.colors.red[6]} />}
          onClick={() => onSelect && onSelect("canceled")}
        >
          Canceled
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
};
