import React from "react";
import factory from '../ethereum/factory';
import { Card } from 'semantic-ui-react';
import Layout from "../components/Layout";
import Link from "next/link";
import 'semantic-ui-css/semantic.min.css';

class HomePage extends React.Component {
    static async getInitialProps() {
        const contracts = await factory.methods.getDeployedContracts().call();
        return {contracts};
    }
    
    renderContracts() {
        const items = this.props.contracts.map(address => {
            return {
              key: address,
              header: <p>{address}</p>,
              description: <Link 
                href={{ pathname: "/contracts/contract", query: { address }, }} 
                as={`/contracts/${address}`} >View/Manage Contract</Link>,
              fluid: true,
              style: { backgroundColor: '#323232' }
            }
        });
          
        return <Card.Group items={items} />;
    }
    render() {
        return (
            <Layout>
                <h3>List of deployed escrow contracts</h3>
                {this.renderContracts()}
            </Layout>
        )
    }
}
  export default HomePage