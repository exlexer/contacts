import App from '../../client/App.vue'

describe('@components/_base-button', () => {
  it('renders its content', () => {
    const { element } = shallowMount(App);
    expect(element.innerHTML).toContain(slotContent);
  })
})
