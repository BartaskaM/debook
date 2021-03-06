const Styles =  ({
  deviceCardImage: {
    height: 200,
    width: 'auto',
    display: 'block',
    margin: 'auto',
  },
  availabilityTagAvailable: {
    borderRadius: 8,
    webkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    color: '#fff',
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 500,
    height: 16,
    letterSpacing: .55,
    lineHeight: 1.7,
    paddingTop: 0,
    paddingRight: 10,
    paddingLeft: 10,
    textTransform: 'uppercase',
    backgroundColor: '#3a9b5c',
  },
  availabilityTagUnavailable: {
    borderRadius: 8,
    webkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    color: '#fff',
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 500,
    height: 16,
    letterSpacing: .55,
    lineHeight: 1.7,
    paddingTop: 0,
    paddingRight: 10,
    paddingLeft: 10,
    textTransform: 'uppercase',
    backgroundColor: '#ce2b27',
  },
  deviceCardTitle: {
    color: '#333',
    fontFamily: 'Roboto Condensed, sans-serif',
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1.25,
    marginTop: 10,
    marginRight: 0,
    marginBottom: 5,
    marginLeft: 20,
    height: 57,
    overflow: 'hidden',
  },
  deviceCardMainContent: {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: .6,
    color: '#999',
    marginLeft: 20,
    height: 20,
  },
  mainTextColor: {
    color: '#000000',
  },
  deviceItem: {
    width: '100%',
  },
});
export default Styles;