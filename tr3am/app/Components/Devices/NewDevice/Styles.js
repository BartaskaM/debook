const Styles = theme => ({
  root: {
    padding: 20,
    margin: 20,
  },
  newDeviceFormField: {
    marginTop: 25,
  },
  fontSize: {
    fontSize: theme.typography.pxToRem(20),
  },
  select: {
    fontSize: theme.typography.pxToRem(20),
    width: '100%',
  },
  menuItemWidth: {
    fontSize: 14,
    width: 420,
  },
  button: {
    height: 50,
    fontSize: 14,
  },
  errorMessage: {
    color: 'red',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonLeft: {
    height: 50,
    fontSize: 14,
    width: '44%',
    margin: '3%',
    position: 'left',
    bottom: 0,
    left: 0,
  },
  buttonRight: {
    height: 50,
    fontSize: 14,
    width: '44%',
    margin: '3%',
    position: 'right',
    bottom: 0,
    right: 0,
  },
});
  
export default Styles;