import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    position: 'relative',
    alignItems: 'center',
  },
  rectangle: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
  vector: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: '100%',
    top: 170,
    left: 0,
  },
  regMoon: {
    position: 'absolute',
    width: 260,
    height: 260,
    transform: 'rotate(43.49deg)',
    top: -50,
    right: -70,
  },

  logMoon: {
    position: 'absolute',
    width: 260,
    height: 260,
    transform: 'rotate(43.49deg)',
    top: -50,
    left: -100,
  },

  title: {
    position: 'absolute',
    top: 270,
    fontSize: 40,
    fontWeight: '700',
    color: '#351b64',
    marginBottom: 8,
  },
  subtitle: {
    position: 'absolute',
    top: 330,
    fontSize: 18,
    fontWeight: '400',
    color: '#8b8b8b',
  },
  formContainer: {
    position: 'absolute',
    top: 340,
    left: 0,
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 35,
    paddingTop: 55,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c3bee9',
    borderRadius: 10,
    marginBottom: 26,
    paddingStart: 20,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#351b64',
    fontSize: 14,
    fontWeight: '500',
    height: '100%',
    borderRadius: 10,
    paddingStart: 10,
  },
  button: {
    backgroundColor: '#351b64',
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  linkText: {
    fontSize: 15,
    color: '#8b8b8b',
  },
  link: {
    fontSize: 15,
    color: '#351b64',
    fontWeight: '600',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  orContainer: {
    marginTop: 25,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#c7c7c7',
    position: 'absolute',
    top: 8,
  },
  orTextContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  orText: {
    color: '#6b6b6b',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  authIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20,
  },
  authIconButton: {
    borderColor: '#c7c7c7',
    borderWidth: 1,
    borderRadius: 25,
    padding: 13,
  },
  authIcon: {
    width: 24,
    height: 24,
  },


  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 5,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#351B64',
    borderRadius: 9,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#351B64',
  },

  rememberText: {
    color: '#8B8B8B',
    fontSize: 13,
  },
  forgotText: {
    color: '#351B64',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});
