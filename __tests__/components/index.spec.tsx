import { shallow } from 'enzyme'
import Home from '../../src/pages'
import Favorites from '../../src/pages/favorites'
import Main from '../../src/components/Main'
import Starred from '../../src/components/Starred'

describe('Pages', () => {
  describe('Home', () => {
    it('should render the Home component without error', () => {
      const component = shallow(<Home />)
      expect(component.find(Main)).toHaveLength(1)
    })
  })

  describe('Favorites', () => {
    it('should render the Starred component without error', () => {
      const component = shallow(<Favorites />)
      expect(component.find(Starred)).toHaveLength(1)
    })
  })
})
