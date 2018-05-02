const Styles = theme=>({
  root: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginLeft: '21%',
    width: '79%',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  buttonLeft: {
    width: '44%',
    margin: '3%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  buttonRight: {
    width: '44%',
    margin: '3%',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  devicePaper: {
    height: '100%',
    position: 'relative',
    paddingBottom: 55,
  },
  deviceItem: {
    height: '100%',
  },
  addNewButton: {
    float: 'right',
    height: 60,
    width: 180,
    fontSize: 20,
  },
  noItems: {
    width: '100%',
    padding: 20,
  },
  itemContainer: {
    width: '100%',
  },
});
  
export default Styles;