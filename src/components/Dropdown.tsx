import { 
  Root, 
  Trigger, 
  Portal, 
  Content, 
  RadioGroup, 
  RadioItem, 
  ItemIndicator } from "@radix-ui/react-dropdown-menu";
import { AngleIcon, DotIcon } from '../assets/icons';
import { itemIndicatorStyles, radioItemStyles } from "../assets/styles";
import './Dropdown.css';

import { DropdownMenuType } from "../types";

const DropdownMenu = ({ name, value, items, onValueChange }: DropdownMenuType) => (
  <Root>
    <Trigger asChild>
      <button type="button" className='dropdown__button centered button'>
        { name } <AngleIcon />
      </button>
    </Trigger>
    <Portal>
      <Content align='start' className='overlay dropdown__body'>
        <RadioGroup value={ value } onValueChange={ onValueChange }
          style={{ }}
        >
          {
            items.map((item, i) => (
              <RadioItem key={ i } value={ item.value }
                style={ radioItemStyles }
              >
                <ItemIndicator style={ itemIndicatorStyles }>
                  <DotIcon />
                </ItemIndicator>
                <button type="button" className='dropdown__button button'>
                  { item.name }
                </button>
              </RadioItem>
            ))
          }
        </RadioGroup>
      </Content>
    </Portal>
  </Root>
);

export default DropdownMenu;