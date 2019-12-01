import { NavigationActions } from 'react-navigation'

let _navigator


const setTopLevelNavigator = ref => {
  _navigator = ref
}

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  )
}

const back = () => {
  _navigator.dispatch(NavigationActions.back())
}

const popToTop = (immediate = true) => {
  _navigator.dispatch({
    type: NavigationActions.POP_TO_TOP,
    immediate,
  })
}

const reset = ({ actions, index }) => {
  _navigator.dispatch({
    type: NavigationActions.RESET,
    index,
    actions,
  })
}

const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null
  }

  const route = navigationState.routes[navigationState.index]

  if (route.routes) {
    return getCurrentRouteName(route)
  }

  return route.routeName
}

export const NavigationService = {
  navigate,
  setTopLevelNavigator,
  back,
  popToTop,
  reset,
  navigator: _navigator,
  _navigator,
  getCurrentRouteName,
}

window.NavigationService = NavigationService
