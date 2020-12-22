import { signOut } from '../auth';
import { Button } from '../ui';

export const SignOutButton = (props) => (
    <Button onClick={signOut} {...props}>Sign Out</Button>
);