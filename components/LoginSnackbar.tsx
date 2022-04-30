import { Alert, Snackbar } from "@mui/material"
import { getAuth } from '../hooks/getAuth'
import Link from "next/link"

const LoginSnackbar = () => {
    const auth = getAuth()
  
    return (
      <Snackbar
        open={auth?.currentUser?.isAnonymous==false && auth?.currentUser?.email!="sample@example.com"}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        key={"bottom" + "center"}
      >
          <Alert severity="warning">
            <Link href={"/"}>
                すでにログインしています
            </Link>
          </Alert>
      </Snackbar>
    )

}

export default LoginSnackbar
