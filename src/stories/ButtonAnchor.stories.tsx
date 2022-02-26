import { ComponentMeta, ComponentStory } from "@storybook/react";
import ButtonAnchor from "./ButtonAnchor";

export default {
  title: "Components/ButtonAnchor",
  component: ButtonAnchor,
} as ComponentMeta<typeof ButtonAnchor>;

const Template: ComponentStory<typeof ButtonAnchor> = (args) => (
  <ButtonAnchor {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  title: "Github",
  size: "small",
  href: "https://github.com",
};

export const Small = Template.bind({});
Small.args = {
  title: "Github",
  size: "small",
  href: "https://github.com",
};

export const Medium = Template.bind({});
Medium.args = {
  title: "Github",
  size: "medium",
  href: "https://github.com",
};

export const Large = Template.bind({});
Large.args = {
  title: "Github",
  size: "large",
  href: "https://github.com",
};
