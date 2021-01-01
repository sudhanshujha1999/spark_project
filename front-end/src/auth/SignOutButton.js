import { Button } from '../ui';
import { signOut } from './signOut';

export const SignOutButton = (props) => (
    <Button onClick={signOut} {...props}>Sign Out</Button>
);