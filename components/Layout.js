import React from "react";
import { Container, Menu } from "semantic-ui-react";
import Link from "next/link";

const Layout = props => {
    return (
        <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: '#242424', color: 'white'}}>
            <Container>
                <Menu color='blue' inverted style={{ marginTop: '10px' }}>
                    <Link href='/'><a className='item'>Escrow dApp</a></Link>
                    <Menu.Menu position="right">
                    <Link href='/list'><a className='item'>Contracts</a></Link>
                    <Link href='/contracts/new'><a className='item'>Create contract</a></Link>
                    </Menu.Menu>
                </Menu>
                {props.children}
            </Container>
        </div>
    );
};
export default Layout;