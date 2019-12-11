import { makeStyles } from '@material-ui/core/styles'
export const signinStyle = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        textAlign:'center'
      },
      cardheader:{
        textAlign:'center',
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center'
      },
    }))