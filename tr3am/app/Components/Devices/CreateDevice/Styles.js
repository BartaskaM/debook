const Styles = theme => ({
  root: {
    padding: 20,
    margin: 20,
  },
  createDevicePaper: {
    padding: 20,
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
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
  wrapper: {
    marginTop: theme.spacing.unit,
    position: 'relative',
  },
  button: {
    height: 50,
    fontSize: 14,
    margin: 15,
    width: '30%',
  },
  buttonsContainer: {
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
  },
  customField: {
    fontSize: theme.typography.pxToRem(20),
    width: '100%',
  },
});
  
export default Styles;