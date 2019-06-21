
const getCurrentBackgroundTheme = (crustState) => {
    return crustState.find(({type}) => type === 'appBackgroundTheme').id
}

export { getCurrentBackgroundTheme }