import renderer from 'react-test-renderer';
import Layout from '../layout';

it('render correctly when children is passed', () => {
    const component = renderer.create(<Layout></Layout>)
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();

    
}) 