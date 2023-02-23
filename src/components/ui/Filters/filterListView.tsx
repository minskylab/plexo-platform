import { Button, Group, MantineTheme } from "@mantine/core";
import { Member, Project, TaskPriority, TaskStatus } from "integration/graphql";
import { useData } from "lib/useData";
import { AntennaBars5, CircleDashed, LayoutGrid, Tag, X } from "tabler-icons-react";
import { AssigneeName, AssigneePhoto } from "../Task/assignee";
import { LabelColor, LabelName } from "../Task/label";
import { PriorityIcon, priorityName } from "../Task/priority";
import { ProjectIcon, ProjectName } from "../Task/project";
import { StatusIcon, statusName } from "../Task/status";
import { LabelType } from "../Task/types";
import { Filter } from "./types";
import { Member as MemberType, Project as ProjectType} from "../../../modules/app/datatypes";


type FilterListViewProps = {
    filter: Filter;
    index: number;
    theme: MantineTheme;
    classes: any;
    filterList: Filter[];
    setFilterList: (filterList: Filter[]) => void;
}

const ProjectData = (id : string) => {
  const { projectsData } = useData();
  return projectsData?.projects.filter((project: ProjectType) => project.id == id)[0];
};

const MemberData = (id : string) => {
  const { membersData } = useData();
  return membersData?.members.filter((member: MemberType) => member.id == id)[0];
};

export const FilterListView = ({
    filter,
    index,
    theme,
    classes,
    filterList,
    setFilterList
} : FilterListViewProps) => {

    const handleDeleteFilter = (index: number) => {
        const newFilterList = [...filterList];
        newFilterList.splice(index, 1);
        setFilterList(newFilterList);
      };

    if (filter.name == "status"){
      if (filter.elements.length > 1){
        return <Group 
          sx={{
            border:'3px solid',
            borderRadius: '5px',
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }}
          key={index} 
          spacing={1}>
          <Button
                className={classes["text-header-buttons"]}
                compact
                variant="subtle"
                color={"gray"}
                leftIcon={<CircleDashed size={16}/>}
              >
                Status is any of 
                <Group mr={10} ml={10} spacing={0}>
                {(filter.elements as TaskStatus[]).map(function (filter: TaskStatus, index: number) {
                  return <div key={index}>{StatusIcon(theme,filter)}</div>;
                })}
                </Group>
                {filter.elements.length} states 
          </Button>
          <Button
                className={classes["text-header-buttons"]}
                compact
                variant="subtle"
                color={"gray"}
                onClick={ () => handleDeleteFilter(index) }
              >
              {<X size={16}/>}
          </Button>
        </Group>
        }
      else{
          return <Group 
          sx={{
            border:'3px solid',
            borderRadius: '5px',
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }}
          key={index} 
          spacing={1}>
          <Button
                className={classes["text-header-buttons"]}
                compact
                variant="subtle"
                color={"gray"}
                leftIcon={<CircleDashed size={16}/>}
              >
                Status is
                <Group mr={10} ml={10} spacing={0}>
                {StatusIcon(theme, filter.elements[0] as TaskStatus)} 
                </Group>
                {statusName(filter.elements[0] as TaskStatus)} 
          </Button>
          <Button
                className={classes["text-header-buttons"]}
                compact
                variant="subtle"
                color={"gray"}
                onClick={ () => handleDeleteFilter(index) }
              >
              {<X size={16}/>}
          </Button>
      </Group>
      }
    }
    if (filter.name == "assignee"){
      if (filter.elements.length > 1){
        return <Group 
          sx={{
            border:'3px solid',
            borderRadius: '5px',
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }}
          key={index} 
          spacing={1}>
        <Button
              className={classes["text-header-buttons"]}
              compact
              variant="subtle"
              color={"gray"}
              leftIcon={<CircleDashed size={16}/>}
            >
              Assignee is any of 
              <Group mr={10} ml={10} spacing={0}>
              {(filter.elements as Member[]).map(function (filter: Member, index: number) {
                return <div key={index}>{AssigneePhoto(filter)}</div>;
              })}
              </Group>
              {filter.elements.length} assignees 
        </Button>
        <Button
                className={classes["text-header-buttons"]}
                compact
                variant="subtle"
                color={"gray"}
                onClick={ () => handleDeleteFilter(index) }
              >
              {<X size={16}/>}
        </Button>
      </Group>
      }
      else{
        return <Group key={index} spacing={6}>
        <Button
              className={classes["text-header-buttons"]}
              compact
              variant="subtle"
              color={"gray"}
              leftIcon={<CircleDashed size={16}/>}
            >
              Assignee is
              <Group mr={10} ml={10} spacing={0}>
              {AssigneePhoto(MemberData(filter.elements[0] as string) as Member)} 
              </Group>
              {AssigneeName(MemberData(filter.elements[0] as string) as Member)} 
        </Button>
        <Button
                className={classes["text-header-buttons"]}
                compact
                variant="subtle"
                color={"gray"}
                onClick={ () => handleDeleteFilter(index) }
              >
              {<X size={16}/>}
        </Button>
      </Group>
      }
    }
    if (filter.name == "creator"){
      if (filter.elements.length > 1){
        return <Group
          sx={{
            border:'3px solid',
            borderRadius: '5px',
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }} 
          key={index} 
          spacing={1}>
        <Button
              className={classes["text-header-buttons"]}
              compact
              variant="subtle"
              color={"gray"}
              leftIcon={<CircleDashed size={16}/>}
            >
              Creator is any of 
              <Group mr={10} ml={10} spacing={0}>
              {(filter.elements as Member[]).map(function (filter: Member, index: number) {
                return <div key={index}>{AssigneePhoto(filter)}</div>;
              })}
              </Group>
              {filter.elements.length} users 
        </Button>
        <Button
                className={classes["text-header-buttons"]}
                compact
                variant="subtle"
                color={"gray"}
                onClick={ () => handleDeleteFilter(index) }
              >
              {<X size={16}/>}
        </Button>
      </Group>
      }
      else{
        return <Group 
          sx={{
            border:'3px solid',
            borderRadius: '5px',
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }} 
          key={index} 
          spacing={1}>
        <Button
              className={classes["text-header-buttons"]}
              compact
              variant="subtle"
              color={"gray"}
              leftIcon={<CircleDashed size={16}/>}
            >
              Creator is
              <Group mr={10} ml={10} spacing={0}>
              {AssigneePhoto(MemberData(filter.elements[0] as string) as Member)} 
              </Group>
              {AssigneeName(MemberData(filter.elements[0] as string) as Member)} 
        </Button>
        <Button
                className={classes["text-header-buttons"]}
                compact
                variant="subtle"
                color={"gray"}
                onClick={ () => handleDeleteFilter(index) }
              >
              {<X size={16}/>}
        </Button>
      </Group>
      }
    }
    if (filter.name == "priority"){
      if (filter.elements.length > 1){
        return <Group 
          sx={{
            border:'3px solid',
            borderRadius: '5px',
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }} 
          key={index} 
          spacing={1}>
        <Button
              className={classes["text-header-buttons"]}
              compact
              variant="subtle"
              color={"gray"}
              leftIcon={<AntennaBars5 size={18} />}
            >
              Priority is any of 
              <Group mr={10} ml={10} spacing={0}>
              {(filter.elements as TaskPriority[]).map(function (filter: TaskPriority, index: number) {
                return <div key={index}>{PriorityIcon(filter, 18)}</div>;
              })}
              </Group>
              {filter.elements.length} priorities 
        </Button>
        <Button
                className={classes["text-header-buttons"]}
                compact
                variant="subtle"
                color={"gray"}
                onClick={ () => handleDeleteFilter(index) }
              >
              {<X size={16}/>}
        </Button>
      </Group>
      }
      else{
        return <Group 
          sx={{
            border:'3px solid',
            borderRadius: '5px',
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }} 
          key={index} 
          spacing={1}>
        <Button
              className={classes["text-header-buttons"]}
              compact
              variant="subtle"
              color={"gray"}
              leftIcon={<AntennaBars5 size={18} />}
            >
              Priority is
              <Group mr={10} ml={10} spacing={0}>
              {PriorityIcon(filter.elements[0] as TaskPriority, 18)} 
              </Group>
              {priorityName(filter.elements[0] as TaskPriority)} 
        </Button>
        <Button
                className={classes["text-header-buttons"]}
                compact
                variant="subtle"
                color={"gray"}
                onClick={ () => handleDeleteFilter(index) }
              >
              {<X size={16}/>}
        </Button>
      </Group>
      }
    }
    if (filter.name == "labels"){
      if (filter.elements.length > 1){
        return <Group 
          sx={{
            border:'3px solid',
            borderRadius: '5px',
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }} 
          key={index} 
          spacing={1}>
        <Button
              className={classes["text-header-buttons"]}
              compact
              variant="subtle"
              color={"gray"}
              leftIcon={<Tag size={18} />}
            >
              Labels includes all of
              <Group mr={10} ml={10} spacing={0}>
              {(filter.elements as LabelType[]).map(function (filter: LabelType, index: number) {
                return <div key={index}>{LabelColor(filter, theme)}</div>;
              })}
              </Group>
              {filter.elements.length} labels 
        </Button>
        <Button
                className={classes["text-header-buttons"]}
                compact
                variant="subtle"
                color={"gray"}
                onClick={ () => handleDeleteFilter(index) }
              >
              {<X size={16}/>}
        </Button>
      </Group>
      }
      else{
        return <Group 
          sx={{
            border:'3px solid',
            borderRadius: '5px',
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }} 
          key={index} 
          spacing={1}>
          <Button
            className={classes["text-header-buttons"]}
            compact
            variant="subtle"
            color={"gray"}
            leftIcon={<CircleDashed size={16}/>}
          >
            Labels includes 
            <Group mr={10} ml={10} spacing={0}>
            {LabelColor(filter.elements[0] as LabelType, theme)} 
            </Group>
            {LabelName(filter.elements[0] as LabelType)} 
          </Button>
          <Button
            className={classes["text-header-buttons"]}
            compact
            variant="subtle"
            color={"gray"}
            onClick={ () => handleDeleteFilter(index) }
          >
            {<X size={16}/>}
          </Button>
      </Group>
      }
    }
    if (filter.name == "project"){
      if (filter.elements.length > 1){
        return <Group 
          sx={{
            border:'3px solid',
            borderRadius: '5px',
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }} 
          key={index} 
          spacing={1}>
          <Button
            className={classes["text-header-buttons"]}
            compact
            variant="subtle"
            color={"gray"}
            leftIcon={<LayoutGrid size={18} />}
          >
            Project is any of 
            <Group mr={10} ml={10} spacing={0}>
              {(filter.elements as Project[]).map(function (filter: Project, index: number) {
                return <div key={index}>{ProjectIcon(filter)}</div>;
              })}
            </Group>
            {filter.elements.length} projects 
          </Button>
          <Button
            className={classes["text-header-buttons"]}
            compact
            variant="subtle"
            color={"gray"}
            onClick={ () => handleDeleteFilter(index) }
          >
            {<X size={16}/>}
          </Button>
      </Group>
      }
      else{
        return <Group 
          sx={{
            border:'3px solid',
            borderRadius: '5px',
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }} 
          key={index} 
          spacing={1}>
        <Button
          className={classes["text-header-buttons"]}
          compact
          variant="subtle"
          color={"gray"}
          leftIcon={<LayoutGrid size={18} />}
        >
          Project is
          <Group mr={10} ml={10} spacing={0}>
          {ProjectIcon(ProjectData(filter.elements[0] as string) as Project)} 
          </Group>
          {ProjectName(ProjectData(filter.elements[0] as string) as Project)} 
        </Button>
        <Button
          className={classes["text-header-buttons"]}
          compact
          variant="subtle"
          color={"gray"}
          onClick={ () => handleDeleteFilter(index) }
        >
          {<X size={16}/>}
        </Button>
      </Group>
      }
    }
    return <Group></Group>;
  };