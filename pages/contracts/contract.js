import React from "react";
import { Grid, Button, Form, Input } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Cards from "../../components/Cards";
import Contract from "../../ethereum/escrow";
import web3 from "../../ethereum/web3";
import 'semantic-ui-css/semantic.min.css';

class ContractShow extends React.Component {
    state = {
        value: ''
    }
    
    static async getInitialProps(props) {
        const accounts = await web3.eth.getAccounts();
        const contract = Contract(props.query.address);
        const _balance = await contract.methods.getBalance().call();
        const _client = await contract.methods.client().call();
        const _freelancer = await contract.methods.freelancer().call();
        const _arbiter = await contract.methods.arbiter().call();
        return { 
            contractBalance: web3.utils.fromWei(_balance, 'ether'),
            clientAddress: _client,
            freelancerAddress: _freelancer,
            arbiterAddress: _arbiter,
            account: accounts[0],
            contractAddress: props.query.address
        };
    }
    
    onSubmit = async event => {
        event.preventDefault();
        await web3.eth.sendTransaction({
            from: this.props.account,
            to: this.props.contractAddress,
            value: web3.utils.toWei(this.state.value, 'ether'),
            });
    }
    
    onPayout = async () => {
        const contract = Contract(this.props.contractAddress);
        await contract.methods.payoutToFreelancer().send({
            from: this.props.account
        });
    }
        
    onRefund = async () => {
        const contract = Contract(this.props.contractAddress);
        await contract.methods.refundToClient().send({
            from: this.props.account
        });
    }
    
    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={10}>
                        <h3>Contract Details</h3>
                        <Cards balance={this.props.contractBalance} client={this.props.clientAddress} 
                            freelancer={this.props.freelancerAddress} arbiter={this.props.arbiterAddress} account={this.props.account}/>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <h3>Send Ether to Contract</h3>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Field>
                                <Input label='ETH' labelPosition='right' value={this.state.value} 
                                    onChange={event => this.setState({ value: event.target.value })}/>
                            </Form.Field>
                            <Button primary>Send</Button>
                        </Form>
                        <hr />
                        <h3>Manage Contract</h3>
                        {(this.props.account == this.props.clientAddress || this.props.account == this.props.arbiterAddress) ? 
                            <Button onClick={this.onPayout} primary>Payout to Freelancer</Button> : <Button disabled>Payout to Freelancer</Button>}
                        {(this.props.account == this.props.freelancerAddress || this.props.account == this.props.arbiterAddress) ? 
                            <Button onClick={this.onRefund} primary>Refund Client</Button> : <Button disabled>Refund Client</Button>}
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default ContractShow;