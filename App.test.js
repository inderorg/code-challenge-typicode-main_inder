import App from './App';

describe('listUsers', () => {
  it('returns a ul', () => {
    const instance = new App();
    const actual = instance.listUsers([]);

    expect(actual).toHaveProperty('type', 'ul');
  });

  it('returns a child element for each user', () => {
    const instance = new App();
    const actual = instance.listUsers([{ name: 'User A' }, { name: 'User B' }]);

    expect(actual.props.children).toHaveLength(2);
  });
});
