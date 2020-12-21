import { signOut } from '../auth';
import { Button } from '../ui';

export const SignOutButton = () => (
    <Button onClick={signOut}>Sign Out</Button>
);