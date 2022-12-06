import { shallowMount } from '@vue/test-utils';
import TplEmpty from './index.vue';

describe('TplEmpty.vue', () => {
  test('renders props.bgColor when passed', () => {
    const bgColor = 'rgb(245, 247, 248)';
    const wrapper = shallowMount(TplEmpty, {
      propsData: { bgColor },
    });
    // console.log('--------------', wrapper.element.style);

    expect(wrapper.element.style.backgroundColor).toBe(bgColor);
  });
});
