// https://docs.nativebase.io/next/action-sheet#page-title

import { Actionsheet, Box, Button, Icon, Pressable, Text } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {InterfaceButtonProps} from "native-base/lib/typescript/components/primitives/Button/types";

type FilterSelectorProps = {
  children: any;
  initialFilter: Filter;
  onFilterChange: (filterValue: Filter) => void;
  filterMenuTitle?: string;
  _button?: InterfaceButtonProps;
};

type FilterSelectorItemProps = {
  materialIconName?: string;
  value: Filter;
  onValuePressed?: () => void
};

type Filter = {
    value: string;
    displayValue?: string;
}

const FilterSelector = (props: FilterSelectorProps) => {
  const [isFilterEnabled, setIsFilterEnabled] = React.useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = React.useState<Filter>(
    props.initialFilter
  );
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  return (
    <>
      <Button
        onPress={() => setIsModalOpen((prevState) => !prevState)}
        leftIcon={
          <Icon as={MaterialCommunityIcons} name={"filter"} size={4} />
        }
        _stack={{ space: 0 }}
        variant={"ghost"}
        {...props._button}
      >
        {selectedFilter.displayValue ? selectedFilter.displayValue : selectedFilter.value}
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
      {props.value.displayValue ? props.value.displayValue : props.value.value}
    </Actionsheet.Item>
  );
};

export default FilterSelector;
