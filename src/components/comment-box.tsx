import { Button, TextField, Typography } from '@material-ui/core';
import * as React from 'react';

export interface ICommentBoxProps {
  me?: boolean
}

export function CommentBox({ me = false }: ICommentBoxProps): JSX.Element {
  return (
    <form method="post" action="comment">
      <input type="hidden" name="parent" value="15237896" />
      <input type="hidden" name="goto" value="item?id=15237896" />
      <input type="hidden" name="hmac" value="02641d0660c89c1a83ccf0d171e42497d10d2135" />
      <TextField
        name="text" rows={me ? 6 : 1}
        multiline fullWidth
        variant="outlined"
        disabled={!me}
        placeholder={me ? "Add comment" : "Log in or sign up to leave a comment"}
      />
      <br />
      <br />
      {me && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" variant='contained' color='primary' style={{ fontWeight: 600, color: 'white' }}>Add comment</Button>
      </div>}
    </form>
  );
}
