// https://docs.nativebase.io/next/action-sheet#page-title

import { Actionsheet, Box, Button, Icon, Pressable, Text } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

type FilterSelectorProps = {
  children: any;
  initialFilter: string;
  onFilterChange: (filterValue: string) => void;
  filterMenuTitle?: string;
};

type FilterSelectorItemProps = {
  materialIconName?: string;
  value: string;
  displayValue?: string;
  onValuePressed?: () => void
};

const FilterSelector = (props: FilterSelectorProps) => {
  const [isFilterEnabled, setIsFilterEnabled] = React.useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = React.useState<string>(
    props.initialFilter
  );
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  return (
    <>
      <Button
        onPress={() => setIsModalOpen((prevState) => !prevState)}
        leftIcon={
          <Icon as={MaterialCommunityIcons} name={"filter"} size={"sm"} />
        }
        _stack={{ space: 0 }}
        variant={"unstyled"}
      >
        {selectedFilter}
      </Button>
      <Actionsheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hideDragIndicator
      >
        <Actionsheet.Content borderTopRadius="0">
          {props.filterMenuTitle && (
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                {props.filterMenuTitle}
              </Text>
            </Box>
          )}
          {React.Children.map(props.children, (child) => {
            // connect the child to the parent
            return React.cloneElement(child as React.ReactElement, {
              onValuePressed: () => {
                setSelectedFilter(child.props.value);
                setIsModalOpen(false);
                props.onFilterChange(child.props.value);
              },
            });
          })}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

FilterSelector.FilterSelectorItem = (props: FilterSelectorItemProps) => {
  const icon = props.materialIconName ? (
    <Icon as={MaterialCommunityIcons} name={props.materialIconName} size={6} />
  ) : undefined;
  return (
    <Actionsheet.Item startIcon={icon} onPress={props.onValuePressed}>
      {props.displayValue ? props.displayValue : props.value}
    </Actionsheet.Item>
  );
};

export default FilterSelector;
