import { useState } from 'react';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '../ui';
import { CreateAccountForm } from './CreateAccountForm';
import { SignInForm } from './SignInForm';

const tabs = [{
    name: 'Sign In',
    component: SignInForm,
}, {
    name: 'Create Account',
    component: CreateAccountForm,
}];

export const AuthPage = () => {
    const [value, setValue] = useState(0);

    return (
        <Container maxWidth="sm">
            <Tabs indicatorColor="primary" value={value} onChange={(_, newValue) => setValue(newValue)}>
                {tabs.map((tab, i) => (
                    <Tab label={tab.name} key={i} style={{ flex: 1 }} />
                ))}
            </Tabs>
            {tabs.map((tab, i) => (
                <TabPanel value={value} index={i} key={i}>
                    <tab.component />
                </TabPanel>
            ))}
        </Container>
    );
}