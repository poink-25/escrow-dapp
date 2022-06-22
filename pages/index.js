import React from "react";
import Layout from "../components/Layout";
import 'semantic-ui-css/semantic.min.css';

class HomePage extends React.Component {
    
    render() {
        return (
            <Layout>
                <h2>Escrow dApp by poink25</h2>
                <p>To get started please install Metamask and switch to Rinkeby test network</p>
                <p>To display a list of deployed escrow contracts select 'Contracts'</p>
                <p>To deploy a new contract select 'Create contract'</p>
                <p>Factory address: 0x2D03D8021B2B64D495378093bbd980B4BCD62523</p>
                <p>Check out my Github: <a href="https://github.com/poink-25">poink-25</a></p>
            </Layout>
        )
    }
}
  export default HomePage