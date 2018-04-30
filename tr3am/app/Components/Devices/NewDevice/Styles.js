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
  errorMessage: {
    color: 'red',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  button: {
    height: 50,
    fontSize: 14,
    margin: '3%',
    fullWidth: 'true',
    bottom: 0,
    right: 0,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'center',
    marginTop: 25,
  },
});
  
export default Styles;