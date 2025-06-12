import { Button } from '@mui/material'
import { ButtonViewRestrictedUserProps } from '@/interfaces/Atoms'

export const ButtonViewRestrictedUser = ({text, documentVisitor, isLink = true} : ButtonViewRestrictedUserProps) => {
  return (
    <Button href={isLink ? `/usuarios-restringidos${documentVisitor ? '?documentvisitor='+documentVisitor : ''}`: ''} variant="contained" color="error" sx={{ width: '100%' }}>
        {text ? text : "Consultar en usuarios restringidos"}
    </Button>
  )
}
