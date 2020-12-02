import React from 'react';

import { BasicTask } from './App';

export default {
  title: 'Example/Task',
  component: Task,
  argTypes: {
  },
};

const Template = (args) => <Task {...args} />;

export const BasicTask = Template.bind({});
BasicTask.args = {
  done: false,
};
