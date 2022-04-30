import { Alert, Snackbar } from "@mui/material"
import { getAuth } from '../hooks/getAuth'
import Link from "next/link"

const AnonymousSnackbar = () => {
    const auth = getAuth()
  
    return (
      <Snackbar
        open={!auth}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        key={"bottom" + "center"}
      >
          <Alert severity="warning">
            <Link href={"/signin"}>
              匿名での利用は上限に達しました。ログインしてください。
            </Link>
          </Alert>
      </Snackbar>
    )

}

export default AnonymousSnackbar
