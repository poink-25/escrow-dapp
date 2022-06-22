import React from "react";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import Layout from "../../components/Layout";
import 'semantic-ui-css/semantic.min.css';

class ContractNew extends React.Component {
    state = {
        freelancerAddress: '',
        arbiterAddress: '',
        errorMessage: '',
        loading: false
    };
    
    onSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createContract(this.state.freelancerAddress, this.state.arbiterAddress)
            .send({ from: accounts[0] });
            
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };
    
    render() {
        return (
            <Layout>
                <h3>Create a Contract</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <p>You must be connected to Metamask to perform this action.</p>
                    <p>Your address will be registered as client Address.</p>
                    <Form.Field>
                        <p>Freelancer Address</p>
                        <Input value={this.state.freelancerAddress} 
                        onChange={event => this.setState({ freelancerAddress: event.target.value })}/>
                    </Form.Field>
                    <Form.Field>
                        <p>Arbiter Address</p>
                        <Input value={this.state.arbiterAddress} 
                        onChange={event => this.setState({ arbiterAddress: event.target.value })}/>
                    </Form.Field>
                    <Message error header='Oops!' content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        );
    };
}

export default ContractNew;